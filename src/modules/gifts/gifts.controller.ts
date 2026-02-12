// ============================================
// Gift Controller — HTTP Request Handling
// ============================================
import { Request, Response } from 'express';
import { GiftService } from './gifts.service';
import { GiftFilters } from '../../types';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';
import { BadRequestError } from '../../errors';

const giftService = new GiftService();

export class GiftController {
    /**
     * GET /gifts
     *
     * Query parameters:
     *   - page (number, default: 1)
     *   - limit (number, default: 10)
     *   - category (string, optional) — e.g. 'food', 'tech', 'fitness'
     *   - offer_type (string, optional) — 'online', 'in-store', 'both'
     *   - location_type (string, optional) — 'nationwide', 'local', 'online-only'
     *   - search (string, optional) — partial match on title or brand name
     *   - sort (string, optional) — 'newest' (default) or 'expiry'
     */
    getAll(req: Request, res: Response): void {
        // Parse and validate pagination params
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));

        // Build the filters object from query params
        const filters: GiftFilters = {
            page,
            limit,
            category: req.query.category as string | undefined,
            offer_type: req.query.offer_type as string | undefined,
            location_type: req.query.location_type as string | undefined,
            search: req.query.search as string | undefined,
            sort: (req.query.sort as string) === 'expiry' ? 'expiry' : 'newest',
        };

        const result = giftService.getAll(filters);
        res.json(result);
    }

    /**
     * POST /gifts/:id/claim
     *
     * Authenticated route. Claims a gift for the logged-in student.
     * The student info is extracted from the JWT by the auth middleware.
     */
    claim(req: AuthenticatedRequest, res: Response): void {
        const idParam = req.params.id;
        const giftId = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);

        if (isNaN(giftId)) {
            throw new BadRequestError('Invalid gift ID');
        }

        // req.student is set by authMiddleware
        const studentId = req.student!.studentId;

        const coupon = giftService.claimGift(studentId, giftId);
        res.status(201).json({
            message: 'Gift claimed successfully',
            coupon,
        });
    }
}
