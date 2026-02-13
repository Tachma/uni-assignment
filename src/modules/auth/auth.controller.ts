// ============================================
// Auth Controller — HTTP Request Handling
// ============================================
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { BadRequestError } from '../../errors';

const authService = new AuthService();

export class AuthController {
    /**
     * POST /api/auth/login
     *
     * Request body: { username: string, password: string }
     * Response: { token: string }
     */
    login(req: Request, res: Response): void {
        const { username, password } = req.body;

        // Hand-rolled validation (no external library)
        if (!username || typeof username !== 'string') {
            throw new BadRequestError('Username is required');
        }
        if (!password || typeof password !== 'string') {
            throw new BadRequestError('Password is required');
        }

        const token = authService.login(username, password);
        res.json({ token });
    }

    /**
     * POST /api/auth/register
     *
     * Request body: { username: string, email: string, password: string }
     * Response: { message: string, student: { id, username, email } }
     */
    register(req: Request, res: Response): void {
        const { username, email, password } = req.body;

        if (!username || typeof username !== 'string') {
            throw new BadRequestError('Username is required');
        }
        if (!email || typeof email !== 'string') {
            throw new BadRequestError('Email is required');
        }
        if (!password || typeof password !== 'string') {
            throw new BadRequestError('Password is required');
        }

        const student = authService.register(username, email, password);
        res.status(201).json({
            message: 'Student registered successfully',
            student,
        });
    }
}
