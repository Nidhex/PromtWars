import { Router } from 'express';
import { handleGenerateProjects } from '../controllers/projectController.js';
import { projectGenerationRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/generate', projectGenerationRateLimiter, handleGenerateProjects);

export default router;
