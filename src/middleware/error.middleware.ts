// ============================================
// Global Error Handler Middleware
// ============================================
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

/**
 * Express error-handling middleware.
 * Must have 4 parameters so Express recognizes it as an error handler.
 *
 * - If the error is an instance of AppError, return the appropriate status code.
 * - Otherwise, return 500 Internal Server Error (never leak stack traces).
 */
export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }

    // Unexpected error — log it but don't expose internals
    console.error('[Error]', err);
    res.status(500).json({ error: 'Internal server error' });
}
