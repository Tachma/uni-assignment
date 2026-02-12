// ============================================
// Gift Routes
// ============================================
import { Router } from 'express';
import { GiftController } from './gifts.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
const giftController = new GiftController();

// GET /gifts — Public: list gifts with filters, search, sort, pagination
router.get('/', (req, res, next) => {
    try {
        giftController.getAll(req, res);
    } catch (error) {
        next(error);
    }
});

// POST /gifts/:id/claim — Protected: claim a gift (requires JWT)
router.post('/:id/claim', authMiddleware, (req, res, next) => {
    try {
        giftController.claim(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
