import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initializeJsonDatabase } from '../backend/services/initData';
import { publicRouter } from '../backend/routes/publicRoutes';
import { adminAuthRouter } from '../backend/routes/adminAuthRoutes';
import { adminCrudRouter } from '../backend/routes/adminCrudRoutes';
import { sitemapRobotsRouter } from '../backend/routes/sitemapRobots';
import { errorHandler } from '../backend/middleware/errorHandler';

const app = express();

// Initialize JSON database safely in memory & disk
initializeJsonDatabase().catch((err) => {
  console.warn('[Vercel Serverless] JSON DB initialization notice:', err);
});

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'scholarbridge_super_secret_cookie_key_2026'));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

app.use(sitemapRobotsRouter);

// Health endpoints
app.get(['/api/health', '/health'], (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    platform: 'Vercel Serverless / Cloud Run',
    timestamp: new Date().toISOString()
  });
});

// Admin Auth Routes (support both /api/admin/auth and /admin/auth)
app.use('/api/admin/auth', adminAuthRouter);
app.use('/admin/auth', adminAuthRouter);

// Admin CRUD Routes (support both /api/admin and /admin)
app.use('/api/admin', adminCrudRouter);
app.use('/admin', adminCrudRouter);

// Public Routes (support both /api and /)
app.use('/api', publicRouter);
app.use('/', publicRouter);

// Central Error Handler
app.use(errorHandler);

export default app;
