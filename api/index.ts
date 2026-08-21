import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initializeJsonDatabase } from '../backend/services/initData';
import { publicRouter } from '../backend/routes/publicRoutes';
import { adminAuthRouter } from '../backend/routes/adminAuthRoutes';
import { adminCrudRouter } from '../backend/routes/adminCrudRoutes';
import { sitemapRobotsRouter } from '../backend/routes/sitemapRobots';
import { errorHandler } from '../backend/middleware/errorHandler';

const app = express();

// Initialize JSON storage database files if needed
initializeJsonDatabase().catch((err) => {
  console.warn('[Vercel Serverless] JSON DB initialization notice:', err);
});

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'scholarbridge_super_secret_cookie_key_2026'));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

app.use(sitemapRobotsRouter);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    platform: 'Vercel Serverless / Cloud Run',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', publicRouter);
app.use('/api/admin/auth', adminAuthRouter);
app.use('/api/admin', adminCrudRouter);
app.use(errorHandler);

export default app;
