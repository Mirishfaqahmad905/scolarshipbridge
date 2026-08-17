import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

import { initializeJsonDatabase } from './backend/services/initData';
import { SchedulerService } from './backend/services/schedulerService';
import { publicRouter } from './backend/routes/publicRoutes';
import { adminAuthRouter } from './backend/routes/adminAuthRoutes';
import { adminCrudRouter } from './backend/routes/adminCrudRoutes';
import { sitemapRobotsRouter } from './backend/routes/sitemapRobots';
import { errorHandler } from './backend/middleware/errorHandler';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize JSON storage database files
  await initializeJsonDatabase();

  // Start automation scheduler (scholarship expiration & publishing)
  SchedulerService.start(60 * 1000);

  // Security & Parsing Middlewares
  const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://localhost:5173'
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.run.app')) {
          callback(null, true);
        } else {
          callback(null, true); // Permissive in preview container
        }
      },
      credentials: true
    })
  );

  app.use(cookieParser(process.env.COOKIE_SECRET || 'scholarbridge_super_secret_cookie_key_2026'));
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // ==========================================
  // SITEMAP & ROBOTS
  // ==========================================
  app.use(sitemapRobotsRouter);

  // ==========================================
  // API ROUTES
  // ==========================================
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      engine: 'JSON File Storage',
      storageLocation: 'backend/data/*.json',
      timestamp: new Date().toISOString()
    });
  });

  // Public APIs
  app.use('/api', publicRouter);

  // Administrator Auth APIs
  app.use('/api/admin/auth', adminAuthRouter);

  // Administrator CRUD APIs
  app.use('/api/admin', adminCrudRouter);

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  // ==========================================
  // FRONTEND SPA / VITE MIDDLEWARE
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [Server] ScholarBridge Node+Express JSON backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('❌ [Server] Fatal server startup error:', err);
  process.exit(1);
});
