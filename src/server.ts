// ============================================
// Server Entry Point
// ============================================
import dotenv from 'dotenv';

// Load environment variables BEFORE any other imports
dotenv.config();

import app from './app';
import { getDatabase } from './config/database';

const PORT = process.env.PORT || 3000;

// Initialize the database (creates tables + seeds data)
getDatabase();

app.listen(PORT, () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
    console.log(`[Server] Endpoints:`);
    console.log(`  POST /auth/login`);
    console.log(`  GET  /gifts`);
    console.log(`  POST /gifts/:id/claim`);
});
