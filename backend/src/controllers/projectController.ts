import { Request, Response, NextFunction } from 'express';
import { projectDiscoverySchema } from '../schemas/projectDiscoverySchema.js';
import { generatePersonalizedProjects } from '../services/projectGenerationService.js';

export async function handleGenerateProjects(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const parseResult = projectDiscoverySchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Invalid request input format',
        details: parseResult.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
      return;
    }

    const projects = await generatePersonalizedProjects(parseResult.data);

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
}
