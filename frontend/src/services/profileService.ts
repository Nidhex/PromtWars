import { StudentProfile, UploadedDocument } from '../types/student';
import { ServiceResponse } from '../types/common';
import { mockStudentProfile } from './mockData';

// In-memory state for development / prototype mode
let currentProfile: StudentProfile = { ...mockStudentProfile };

export const profileService = {
  async getProfile(): Promise<ServiceResponse<StudentProfile>> {
    // Simulate short network delay
    await new Promise((resolve) => setTimeout(resolve, 150));
    return {
      success: true,
      data: { ...currentProfile },
      timestamp: new Date().toISOString(),
    };
  },

  async updateProfile(updates: Partial<StudentProfile>): Promise<ServiceResponse<StudentProfile>> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    currentProfile = {
      ...currentProfile,
      ...updates,
    };
    return {
      success: true,
      data: { ...currentProfile },
      timestamp: new Date().toISOString(),
    };
  },

  async uploadDocument(file: File): Promise<ServiceResponse<UploadedDocument>> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Determine type safely
    const ext = file.name.split('.').pop()?.toLowerCase();
    const fileType: 'pdf' | 'docx' | 'txt' =
      ext === 'docx' ? 'docx' : ext === 'txt' ? 'txt' : 'pdf';

    const newDoc: UploadedDocument = {
      id: `doc_${Date.now()}`,
      fileName: file.name,
      fileSize: file.size,
      fileType,
      uploadedAt: new Date().toISOString(),
      status: 'indexed',
      extractedSummary: `Parsed ${file.name}: Identified strong engineering coursework and relevant project interests.`,
      extractedSkills: ['TypeScript', 'FastAPI', 'LLM RAG', 'PostgreSQL'],
      extractedDomains: ['AI Systems', 'Developer Tools'],
    };

    currentProfile.documents = [newDoc, ...currentProfile.documents];

    return {
      success: true,
      data: newDoc,
      timestamp: new Date().toISOString(),
    };
  },

  async deleteDocument(documentId: string): Promise<ServiceResponse<boolean>> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    currentProfile.documents = currentProfile.documents.filter((d) => d.id !== documentId);
    return {
      success: true,
      data: true,
      timestamp: new Date().toISOString(),
    };
  },

  async setActiveProject(projectId: string): Promise<ServiceResponse<StudentProfile>> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    currentProfile.activeProjectId = projectId;
    return {
      success: true,
      data: { ...currentProfile },
      timestamp: new Date().toISOString(),
    };
  },
};
