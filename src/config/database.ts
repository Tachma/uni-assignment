// ============================================
// Database Singleton — SQLite Connection
// ============================================
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let db: Database.Database;

/**
 * Returns the singleton database instance.
 * On first call, it initializes the database:
 *   1. Creates the .db file at DB_PATH
 *   2. Enables WAL journal mode (better read performance)
 *   3. Enables foreign key enforcement
 *   4. Executes schema.sql to create tables
 *   5. Executes seed.sql to insert initial data
 */
export function getDatabase(): Database.Database {
    if (!db) {
        const dbPath = process.env.DB_PATH || './database/marketplace.db';

        // Ensure the directory exists
        const dbDir = path.dirname(dbPath);
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }

        db = new Database(dbPath);

        // Performance & integrity pragmas
        db.pragma('journal_mode = WAL');
        db.pragma('foreign_keys = ON');

        // Run schema and seed scripts
        const schemaPath = path.join(__dirname, '../../database/schema.sql');
        const seedPath = path.join(__dirname, '../../database/seed.sql');

        const schema = fs.readFileSync(schemaPath, 'utf-8');
        const seed = fs.readFileSync(seedPath, 'utf-8');

        db.exec(schema);
        db.exec(seed);

        console.log('[Database] Initialized successfully');
    }

    return db;
}
