import { Request, Response, NextFunction } from 'express';
import { resumeAnalysisService } from '../services/resumeAnalysisService.js';

export async function handleAnalyzeResume(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'No resume file uploaded. Please upload a PDF or DOCX file up to 5MB.',
      });
      return;
    }

    const jobDescription = typeof req.body?.jobDescription === 'string' ? req.body.jobDescription : undefined;

    const report = await resumeAnalysisService.analyzeResumeBuffer(
      req.file.buffer,
      req.file.originalname,
      jobDescription
    );

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
}
