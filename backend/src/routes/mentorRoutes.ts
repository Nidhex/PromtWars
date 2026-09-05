import { Router } from 'express';
import { handleMentorChat } from '../controllers/mentorController.js';
import { mentorChatRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/chat', mentorChatRateLimiter, handleMentorChat);

export default router;
