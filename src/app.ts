// ============================================
// Express Application Setup
// ============================================
import express from 'express';
import authRoutes from './modules/auth/auth.routes';
import giftRoutes from './modules/gifts/gifts.routes';
import { errorHandler } from './middleware/error.middleware';
import { BrandRepository } from './repositories/brand.repository';

const app = express();
const brandRepository = new BrandRepository();

// ---------- Global Middleware ----------
app.use(express.json()); // Parse JSON request bodies

// ---------- Serve Static Files (Frontend) ----------
app.use(express.static('public'));

// ---------- API Routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/gifts', giftRoutes);

// GET /api/brands — for frontend sidebar filter
app.get('/api/brands', (_req, res) => {
    const brands = brandRepository.findAll();
    res.json(brands);
});

// ---------- Global Error Handler ----------
// Must be registered AFTER all routes
app.use(errorHandler);

export default app;
