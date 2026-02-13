// ============================================
// Auth Service — Login & Register Logic
// ============================================
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StudentRepository } from '../../repositories/student.repository';
import { UnauthorizedError, ConflictError, BadRequestError } from '../../errors';
import { Student } from '../../types';

const studentRepository = new StudentRepository();

export class AuthService {
    /**
     * Authenticate a student with username and password.
     *
     * Steps:
     *   1. Look up the student by username
     *   2. Compare the plain-text password against the stored bcrypt hash
     *   3. If both pass, sign and return a JWT token
     *
     * @param username - The student's username
     * @param password - The plain-text password
     * @returns A signed JWT token string
     * @throws UnauthorizedError if username not found or password mismatch
     */
    login(username: string, password: string): string {
        // Step 1: Find the student
        const student = studentRepository.findByUsername(username);
        if (!student) {
            throw new UnauthorizedError('Invalid username or password');
        }

        // Step 2: Verify the password
        const isPasswordValid = bcrypt.compareSync(password, student.password_hash);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Invalid username or password');
        }

        // Step 3: Sign JWT
        const secret = process.env.JWT_SECRET || 'fallback-secret';
        const token = jwt.sign(
            { studentId: student.id, username: student.username, email: student.email },
            secret,
            { expiresIn: '24h' }
        );

        return token;
    }

    /**
     * Register a new student.
     *
     * Steps:
     *   1. Hash the password with bcrypt
     *   2. Insert the student into the database
     *   3. Return the created student (without password_hash)
     *
     * @param username - The desired username
     * @param email - The student's email
     * @param password - The plain-text password
     * @returns The created student (without password_hash)
     * @throws ConflictError if username or email already taken
     */
    register(username: string, email: string, password: string): Omit<Student, 'password_hash'> {
        // Check if username already exists
        const existingByUsername = studentRepository.findByUsername(username);
        if (existingByUsername) {
            throw new ConflictError('Username already taken');
        }

        // Check if email already exists
        const existingByEmail = studentRepository.findByEmail(email);
        if (existingByEmail) {
            throw new ConflictError('Email already registered');
        }

        // Hash the password
        const passwordHash = bcrypt.hashSync(password, 10);

        // Create the student
        return studentRepository.create(username, email, passwordHash);
    }
}
