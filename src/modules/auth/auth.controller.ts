// ============================================
// Auth Controller — HTTP Request Handling
// ============================================
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { BadRequestError } from '../../errors';

const authService = new AuthService();

export class AuthController {
    /**
     * POST /auth/login
     *
     * Request body: { email: string, password: string }
     * Response: { token: string }
     */
    login(req: Request, res: Response): void {
        const { email, password } = req.body;

        // Hand-rolled validation (no external library)
        if (!email || typeof email !== 'string') {
            throw new BadRequestError('Email is required');
        }
        if (!password || typeof password !== 'string') {
            throw new BadRequestError('Password is required');
        }

        const token = authService.login(email, password);
        res.json({ token });
    }
}
