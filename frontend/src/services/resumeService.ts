import { ResumeAnalysisReport } from '../types/resume';
import { ServiceResponse } from '../types/common';

const BACKEND_URL = (import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:3001';

export const resumeService = {
  async analyzeResume(
    file: File,
    jobDescription?: string
  ): Promise<ServiceResponse<ResumeAnalysisReport>> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (jobDescription && jobDescription.trim().length > 0) {
        formData.append('jobDescription', jobDescription.trim());
      }

      const response = await fetch(`${BACKEND_URL}/api/resume/analyze`, {
        method: 'POST',
        body: formData,
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        return {
          success: false,
          error: json.error || json.message || `API Error (${response.status}): ${response.statusText}`,
          timestamp: new Date().toISOString(),
        };
      }

      return {
        success: true,
        data: json.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Network error communicating with backend API';
      return {
        success: false,
        error: `Unable to connect to Resume Analyzer server (${BACKEND_URL}): ${msg}. Please verify the backend is running.`,
        timestamp: new Date().toISOString(),
      };
    }
  },
};
