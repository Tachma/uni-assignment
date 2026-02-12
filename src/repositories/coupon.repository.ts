// ============================================
// Coupon Repository — Raw SQL Queries
// ============================================
import { getDatabase } from '../config/database';
import { Coupon } from '../types';
import { ConflictError } from '../errors';

export class CouponRepository {
    /**
     * Create a new coupon (claim a gift for a student).
     *
     * The UNIQUE(student_id, gift_id) constraint in the schema will throw
     * a SQLITE_CONSTRAINT error if the student has already claimed this gift.
     * We catch that specific error and re-throw it as a ConflictError.
     *
     * @param studentId - The claiming student's ID
     * @param giftId - The gift being claimed
     * @returns The newly created coupon
     */
    create(studentId: number, giftId: number): Coupon {
        const db = getDatabase();

        try {
            const stmt = db.prepare(
                'INSERT INTO coupons (student_id, gift_id) VALUES (?, ?)'
            );
            const result = stmt.run(studentId, giftId);

            return {
                id: Number(result.lastInsertRowid),
                student_id: studentId,
                gift_id: giftId,
                claimed_at: new Date().toISOString(),
            };
        } catch (error: any) {
            // SQLite throws this when the UNIQUE constraint is violated
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                throw new ConflictError('You have already claimed this gift');
            }
            throw error;
        }
    }

    /**
     * Check if a student has already claimed a specific gift.
     *
     * @param studentId - The student's ID
     * @param giftId - The gift's ID
     * @returns The coupon if found, or undefined
     */
    findByStudentAndGift(studentId: number, giftId: number): Coupon | undefined {
        const db = getDatabase();
        const stmt = db.prepare(
            'SELECT id, student_id, gift_id, claimed_at FROM coupons WHERE student_id = ? AND gift_id = ?'
        );
        return stmt.get(studentId, giftId) as Coupon | undefined;
    }
}
