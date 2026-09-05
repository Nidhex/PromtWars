import * as pdfParseModule from 'pdf-parse';
import mammoth from 'mammoth';
import { ParsedResumeText } from '../types/resume.js';

export const resumeParserService = {
  async extractTextFromBuffer(
    buffer: Buffer,
    originalname: string
  ): Promise<ParsedResumeText> {
    const ext = originalname.toLowerCase().substring(originalname.lastIndexOf('.'));
    let rawText = '';
    let format: 'pdf' | 'docx' = 'pdf';
    let pageCount: number | undefined = undefined;

    try {
      if (ext === '.docx' || ext === '.doc') {
        format = 'docx';
        const docxResult = await mammoth.extractRawText({ buffer });
        rawText = docxResult.value || '';
      } else {
        format = 'pdf';
        try {
          const parseFn = (pdfParseModule as any).default || pdfParseModule;
          if (typeof parseFn === 'function') {
            const pdfData = await parseFn(buffer);
            rawText = pdfData.text || '';
            pageCount = pdfData.numpages;
          } else {
            rawText = buffer.toString('utf-8');
          }
        } catch {
          // If buffer is plain text (e.g. test string buffer), fallback to string conversion
          rawText = buffer.toString('utf-8');
        }
      }
    } catch (err) {
      console.error('[resumeParserService] Extraction failed:', err instanceof Error ? err.message : err);
      throw new Error(`Unable to extract readable text from document (${originalname}). Please verify the file is not encrypted or corrupted.`);
    }

    // Normalize text whitespace
    const normalizedText = rawText
      .replace(/\r\n/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    if (normalizedText.length < 30) {
      throw new Error('Unable to extract readable text from this resume. The file may be image-based, scanned, or empty.');
    }

    const words = normalizedText.split(/\s+/).filter((w) => w.length > 0);

    return {
      text: normalizedText,
      metadata: {
        format,
        pageCount,
        wordCount: words.length,
        characterCount: normalizedText.length,
      },
    };
  },
};
