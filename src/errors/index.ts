// ============================================
// Custom Error Classes — Global Error Handling
// ============================================

/**
 * Base application error.
 * All custom errors extend this so the global error handler
 * can distinguish expected errors from unexpected ones.
 */
export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        // Restore prototype chain (required when extending built-in classes in TS)
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

/** 400 — Bad Request (missing/invalid input) */
export class BadRequestError extends AppError {
    constructor(message: string = 'Bad request') {
        super(message, 400);
    }
}

/** 401 — Unauthorized (missing or invalid credentials/token) */
export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}

/** 404 — Not Found */
export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}

/** 409 — Conflict (e.g. duplicate claim) */
export class ConflictError extends AppError {
    constructor(message: string = 'Conflict') {
        super(message, 409);
    }
}
