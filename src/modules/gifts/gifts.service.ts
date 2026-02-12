// ============================================
// Gift Service — Business Logic
// ============================================
import { GiftRepository } from './gifts.repository';
import { CouponRepository } from '../../repositories/coupon.repository';
import { GiftFilters, PaginatedResponse, GiftWithBrand, Coupon } from '../../types';
import { NotFoundError } from '../../errors';

const giftRepository = new GiftRepository();
const couponRepository = new CouponRepository();

export class GiftService {
    /**
     * Get all gifts with filtering, search, sorting, and pagination.
     * Delegates entirely to the repository layer.
     */
    getAll(filters: GiftFilters): PaginatedResponse<GiftWithBrand> {
        return giftRepository.findAll(filters);
    }

    /**
     * Claim a gift for a student (create a coupon).
     *
     * Business rules:
     *   1. The gift must exist (404 if not)
     *   2. The student can only claim each gift once (409 if duplicate)
     *
     * @param studentId - The authenticated student's ID
     * @param giftId - The gift to claim
     * @returns The created coupon
     */
    claimGift(studentId: number, giftId: number): Coupon {
        // Verify the gift exists
        const gift = giftRepository.findById(giftId);
        if (!gift) {
            throw new NotFoundError('Gift not found');
        }

        // Attempt to create the coupon
        // If the student already claimed this gift, the repository will throw ConflictError
        return couponRepository.create(studentId, giftId);
    }
}
