// ============================================
// Brand Repository — Raw SQL Queries
// ============================================
import { getDatabase } from '../config/database';
import { Brand } from '../types';

export class BrandRepository {
    /**
     * Find all brands.
     */
    findAll(): Brand[] {
        const db = getDatabase();
        const stmt = db.prepare('SELECT id, name, logo_url FROM brands ORDER BY name');
        return stmt.all() as Brand[];
    }
}
