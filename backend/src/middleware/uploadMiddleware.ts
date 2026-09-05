import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

const allowedExtensions = ['.pdf', '.docx', '.doc'];

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (_req, file, cb) => {
    const ext = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    const mimeValid = allowedMimeTypes.includes(file.mimetype);
    const extValid = allowedExtensions.includes(ext);

    if (mimeValid || extValid) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX files up to 5MB are allowed.'));
    }
  },
});

export function handleUploadErrors(
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        success: false,
        error: 'File size exceeds maximum limit of 5MB.',
      });
      return;
    }
    res.status(400).json({
      success: false,
      error: `File upload error: ${err.message}`,
    });
    return;
  }

  if (err) {
    res.status(400).json({
      success: false,
      error: err.message || 'Invalid upload request',
    });
    return;
  }

  next();
}
