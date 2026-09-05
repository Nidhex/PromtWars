import { Router } from 'express';
import { handleAnalyzeResume } from '../controllers/resumeController.js';
import { upload, handleUploadErrors } from '../middleware/uploadMiddleware.js';
import { resumeAnalysisRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post(
  '/analyze',
  resumeAnalysisRateLimiter,
  upload.single('file'),
  handleUploadErrors,
  handleAnalyzeResume
);

export default router;
