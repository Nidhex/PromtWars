import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './lib/env.js';
import projectRoutes from './routes/projectRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'ai-project-mentor-backend',
  });
});

app.use('/api/projects', projectRoutes);
app.use('/api/mentor', mentorRoutes);
app.use('/api/resume', resumeRoutes);

app.use(errorHandler);
