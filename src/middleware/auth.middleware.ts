// ============================================
// Auth Middleware — JWT Verification
// ============================================
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';
import { JwtPayload } from '../types';

/**
 * Extends Express Request to include the authenticated student's data.
 * This is set by the auth middleware after successful JWT verification.
 */
export interface AuthenticatedRequest extends Request {
    student?: JwtPayload;
}

/**
 * Middleware that verifies the JWT token from the Authorization header.
 *
 * Expected header format: "Authorization: Bearer <token>"
 *
 * On success, attaches `req.student` with { studentId, email }.
 * On failure, throws UnauthorizedError (caught by global error handler).
 */
export function authMiddleware(
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];

    try {
        const secret = process.env.JWT_SECRET || 'fallback-secret';
        const decoded = jwt.verify(token, secret) as JwtPayload;

        // Attach student info to the request object
        req.student = decoded;
        next();
    } catch {
        throw new UnauthorizedError('Invalid or expired token');
    }
}
