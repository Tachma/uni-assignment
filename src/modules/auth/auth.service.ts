// ============================================
// Auth Service — Login Logic
// ============================================
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StudentRepository } from '../../repositories/student.repository';
import { UnauthorizedError } from '../../errors';

const studentRepository = new StudentRepository();

export class AuthService {
    /**
     * Authenticate a student with email and password.
     *
     * Steps:
     *   1. Look up the student by email
     *   2. Compare the plain-text password against the stored bcrypt hash
     *   3. If both pass, sign and return a JWT token
     *
     * @param email - The student's email
     * @param password - The plain-text password
     * @returns A signed JWT token string
     * @throws UnauthorizedError if email not found or password mismatch
     */
    login(email: string, password: string): string {
        // Step 1: Find the student
        const student = studentRepository.findByEmail(email);
        if (!student) {
            throw new UnauthorizedError('Invalid email or password');
        }

        // Step 2: Verify the password
        const isPasswordValid = bcrypt.compareSync(password, student.password_hash);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Invalid email or password');
        }

        // Step 3: Sign JWT
        const secret = process.env.JWT_SECRET || 'fallback-secret';
        const token = jwt.sign(
            { studentId: student.id, email: student.email },
            secret,
            { expiresIn: '24h' }
        );

        return token;
    }
}
