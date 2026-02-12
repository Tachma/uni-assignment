// ============================================
// Auth Routes
// ============================================
import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();
const authController = new AuthController();

// POST /auth/login — Public: authenticate and receive a JWT
router.post('/login', (req, res, next) => {
    try {
        authController.login(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
