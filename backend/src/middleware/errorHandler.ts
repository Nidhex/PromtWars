import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Safe server-side log (no secrets)
  console.error('[Backend Error Handler]:', err instanceof Error ? err.message : String(err));

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid project discovery input.',
      },
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: {
      code: 'AI_GENERATION_FAILED',
      message: "We couldn't generate project recommendations right now. Please try again.",
    },
  });
}
