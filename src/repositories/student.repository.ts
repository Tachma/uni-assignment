// ============================================
// Student Repository — Raw SQL Queries
// ============================================
import { getDatabase } from '../config/database';
import { Student } from '../types';

export class StudentRepository {
    /**
     * Find a student by their email address.
     * Uses a parameterized query to prevent SQL injection.
     *
     * @param email - The student's email
     * @returns The student record, or undefined if not found
     */
    findByEmail(email: string): Student | undefined {
        const db = getDatabase();
        const stmt = db.prepare('SELECT id, email, password_hash FROM students WHERE email = ?');
        return stmt.get(email) as Student | undefined;
    }
}
