// ============================================
// TypeScript Interfaces — Student Gift Marketplace
// ============================================

// ---------- Database Entities ----------

export interface Student {
    id: number;
    username: string;
    email: string;
    password_hash: string;
}

export interface Brand {
    id: number;
    name: string;
    logo_url: string | null;
}

export interface Gift {
    id: number;
    brand_id: number;
    title: string;
    description: string | null;
    category: string;
    terms: string | null;
    image_url: string | null;
    offer_type: 'online' | 'in-store' | 'both';
    location_type: 'nationwide' | 'local' | 'online-only';
    created_at: string;
    expiry_date: string | null;
}

/** Gift joined with brand info for API responses */
export interface GiftWithBrand extends Gift {
    brand_name: string;
    brand_logo_url: string | null;
}

export interface Coupon {
    id: number;
    student_id: number;
    gift_id: number;
    claimed_at: string;
}

// ---------- Request / Filter Types ----------

export interface GiftFilters {
    page: number;
    limit: number;
    category?: string;
    brands?: string[];
    offer_type?: string;
    location_type?: string;
    search?: string;
    sort?: 'newest' | 'expiry';
    cursor?: string;
}

// ---------- Response Types ----------

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    nextCursor: string | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

// ---------- Auth Types ----------

export interface JwtPayload {
    studentId: number;
    username: string;
    email: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}
