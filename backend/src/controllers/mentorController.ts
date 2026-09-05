import { Request, Response, NextFunction } from 'express';
import { mentorChatRequestSchema } from '../schemas/mentorSchema.js';
import { mentorService } from '../services/mentorService.js';

export async function handleMentorChat(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const parseResult = mentorChatRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Invalid mentor request payload',
        details: parseResult.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
      return;
    }

    const reply = await mentorService.getChatResponse(parseResult.data);

    res.status(200).json({
      success: true,
      data: {
        reply,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
}
