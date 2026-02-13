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
        const stmt = db.prepare('SELECT id, username, email, password_hash FROM students WHERE email = ?');
        return stmt.get(email) as Student | undefined;
    }

    /**
     * Find a student by their username.
     *
     * @param username - The student's username
     * @returns The student record, or undefined if not found
     */
    findByUsername(username: string): Student | undefined {
        const db = getDatabase();
        const stmt = db.prepare('SELECT id, username, email, password_hash FROM students WHERE username = ?');
        return stmt.get(username) as Student | undefined;
    }

    /**
     * Create a new student.
     *
     * @param username - The student's username
     * @param email - The student's email
     * @param passwordHash - The bcrypt-hashed password
     * @returns The newly created student (without password_hash)
     */
    create(username: string, email: string, passwordHash: string): Omit<Student, 'password_hash'> {
        const db = getDatabase();
        const stmt = db.prepare('INSERT INTO students (username, email, password_hash) VALUES (?, ?, ?)');
        const result = stmt.run(username, email, passwordHash);

        return {
            id: Number(result.lastInsertRowid),
            username,
            email,
        };
    }
}
