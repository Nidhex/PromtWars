export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type TeamSize = 'solo' | 'duo' | 'team_3_4';

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'ai_ml' | 'data' | 'cloud_devops' | 'mobile' | 'cybersecurity';
  proficiency: 1 | 2 | 3 | 4 | 5;
}

export interface UploadedDocument {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: 'pdf' | 'docx' | 'txt';
  uploadedAt: string;
  status: 'parsing' | 'indexed' | 'failed';
  extractedSummary?: string;
  extractedSkills?: string[];
  extractedDomains?: string[];
}

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  institution: string;
  degree: string;
  major: string;
  graduationYear: number;
  experienceLevel: ExperienceLevel;
  teamSize: TeamSize;
  targetDurationWeeks: number;
  weeklyHours: number;
  skills: Skill[];
  interests: string[];
  preferredTechStack: string[];
  avoidedTechStack: string[];
  hardwareConstraints: string[];
  documents: UploadedDocument[];
  activeProjectId?: string;
}
