// ============================================
// Gift Repository — Dynamic SQL with Raw Queries
// ============================================
// This is the most critical file in the project.
// It demonstrates dynamic SQL generation with parameterized queries.
// ============================================
import { getDatabase } from '../../config/database';
import { GiftWithBrand, GiftFilters, PaginatedResponse } from '../../types';

export class GiftRepository {
    /**
     * Find all gifts with dynamic filtering, search, sorting, and pagination.
     *
     * HOW DYNAMIC SQL GENERATION WORKS:
     * ---------------------------------
     * Instead of concatenating user input directly into SQL (which causes SQL injection),
     * we build the query in two separate parts:
     *
     *   1. `conditions[]` — An array of SQL fragments (hardcoded strings like 'g.category = ?').
     *      These NEVER contain user input.
     *
     *   2. `params[]` — An array of values that correspond to the `?` placeholders.
     *      These are the actual user-supplied values.
     *
     * At the end, we join the conditions with ' AND ' to form the WHERE clause,
     * and pass the params array to `stmt.all(...params)`. The database driver
     * safely escapes and binds these values, preventing SQL injection.
     *
     * @param filters - The filtering, search, sorting, and pagination options
     * @returns Paginated response with gifts and metadata
     */
    findAll(filters: GiftFilters): PaginatedResponse<GiftWithBrand> {
        const db = getDatabase();
        const conditions: string[] = [];
        const params: (string | number)[] = [];

        // ---------- Dynamic WHERE clause ----------

        // Filter by category (exact match)
        if (filters.category) {
            conditions.push('g.category = ?');
            params.push(filters.category);
        }

        // Filter by brand names (exact match, supports multiple)
        if (filters.brands && filters.brands.length > 0) {
            const placeholders = filters.brands.map(() => '?').join(', ');
            conditions.push(`b.name IN (${placeholders})`);
            params.push(...filters.brands);
        }

        // Filter by offer type (exact match)
        if (filters.offer_type) {
            conditions.push('g.offer_type = ?');
            params.push(filters.offer_type);
        }

        // Filter by location type (exact match)
        if (filters.location_type) {
            conditions.push('g.location_type = ?');
            params.push(filters.location_type);
        }

        // Search by gift title, brand name, OR category (partial match)
        if (filters.search) {
            conditions.push('(g.title LIKE ? OR b.name LIKE ? OR g.category LIKE ?)');
            params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
        }

        // Combine all conditions into a WHERE clause
        const whereClause = conditions.length > 0
            ? 'WHERE ' + conditions.join(' AND ')
            : '';

        // ---------- COUNT query (for pagination metadata) ----------
        // Uses the same WHERE clause but no LIMIT/OFFSET
        const countSql = `
      SELECT COUNT(*) as total
      FROM gifts g
      JOIN brands b ON g.brand_id = b.id
      ${whereClause}
    `;

        const countResult = db.prepare(countSql).get(...params) as { total: number };
        const total = countResult.total;

        // ---------- Sorting ----------
        // Default: newest first. Alternative: soonest expiry first.
        const orderClause = filters.sort === 'expiry'
            ? 'ORDER BY g.expiry_date ASC, g.id ASC'
            : 'ORDER BY g.created_at DESC, g.id DESC';

        // ---------- Pagination ----------
        const limit = filters.limit;

        // Clone params for the data query (cursor adds extra conditions)
        const dataParams: (string | number)[] = [...params];

        // Cursor-based pagination: decode cursor and add WHERE conditions
        // The cursor encodes the last item's sort key + id for stable pagination
        if (filters.cursor) {
            const decoded = Buffer.from(filters.cursor, 'base64').toString('utf-8');
            const [cursorDate, cursorId] = decoded.split('|');

            if (filters.sort === 'expiry') {
                // Ascending order: get items AFTER the cursor
                conditions.push('(g.expiry_date > ? OR (g.expiry_date = ? AND g.id > ?))');
                dataParams.push(cursorDate, cursorDate, parseInt(cursorId));
            } else {
                // Descending order (newest): get items BEFORE the cursor
                conditions.push('(g.created_at < ? OR (g.created_at = ? AND g.id < ?))');
                dataParams.push(cursorDate, cursorDate, parseInt(cursorId));
            }
        }

        // Rebuild WHERE clause with cursor conditions included
        const dataWhereClause = conditions.length > 0
            ? 'WHERE ' + conditions.join(' AND ')
            : '';

        // ---------- DATA query ----------
        const dataSql = `
      SELECT
        g.id,
        g.brand_id,
        g.title,
        g.description,
        g.category,
        g.terms,
        g.image_url,
        g.offer_type,
        g.location_type,
        g.created_at,
        g.expiry_date,
        b.name      AS brand_name,
        b.logo_url   AS brand_logo_url
      FROM gifts g
      JOIN brands b ON g.brand_id = b.id
      ${dataWhereClause}
      ${orderClause}
      LIMIT ?
    `;

        const data = db.prepare(dataSql).all(...dataParams, limit) as GiftWithBrand[];

        // Build the nextCursor from the last item in the result set
        let nextCursor: string | null = null;
        if (data.length === limit) {
            const lastItem = data[data.length - 1];
            const cursorValue = filters.sort === 'expiry'
                ? `${lastItem.expiry_date}|${lastItem.id}`
                : `${lastItem.created_at}|${lastItem.id}`;
            nextCursor = Buffer.from(cursorValue).toString('base64');
        }

        return {
            data,
            meta: {
                limit,
                total,
                nextCursor,
            },
        };
    }

    /**
     * Find a single gift by ID.
     * Used to verify a gift exists before claiming.
     *
     * @param id - The gift's ID
     * @returns The gift with brand info, or undefined if not found
     */
    findById(id: number): GiftWithBrand | undefined {
        const db = getDatabase();
        const stmt = db.prepare(`
      SELECT
        g.id,
        g.brand_id,
        g.title,
        g.description,
        g.category,
        g.terms,
        g.image_url,
        g.offer_type,
        g.location_type,
        g.created_at,
        g.expiry_date,
        b.name      AS brand_name,
        b.logo_url   AS brand_logo_url
      FROM gifts g
      JOIN brands b ON g.brand_id = b.id
      WHERE g.id = ?
    `);
        return stmt.get(id) as GiftWithBrand | undefined;
    }
}
