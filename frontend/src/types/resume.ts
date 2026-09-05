export interface ResumeTextMetadata {
  format: 'pdf' | 'docx';
  pageCount?: number;
  wordCount: number;
  characterCount: number;
}

export interface CategoryScoreBreakdown {
  category: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface ATSScoreResult {
  totalScore: number; // 0-100
  rating: 'Strong' | 'Moderate' | 'Needs Work';
  breakdown: CategoryScoreBreakdown[];
}

export interface JobMatchResult {
  jobMatchScore: number; // 0-100
  matchedKeywords: string[];
  missingKeywords: string[];
  weakKeywords: string[];
  alignmentFeedback: string;
}

export interface SectionFeedback {
  strengths: string[];
  issues: string[];
  recommendations: string[];
}

export interface BulletPointSuggestion {
  original: string;
  suggested: string;
  reason: string;
}

export interface QualitativeResumeAnalysis {
  summaryAnalysis: SectionFeedback;
  skillsAnalysis: SectionFeedback;
  experienceAnalysis: SectionFeedback;
  projectsAnalysis: SectionFeedback;
  educationAnalysis: SectionFeedback;
  contentQuality: SectionFeedback;
  bulletPointSuggestions: BulletPointSuggestion[];
  topImprovements: string[];
  keywordRecommendations: string[];
  overallAssessment: string;
}

export interface ResumeAnalysisReport {
  timestamp: string;
  metadata: ResumeTextMetadata;
  atsScore: ATSScoreResult;
  qualitativeAnalysis: QualitativeResumeAnalysis;
  jobMatch?: JobMatchResult | null;
}

export type AnalysisStage =
  | 'idle'
  | 'uploading'
  | 'extracting'
  | 'checking_ats'
  | 'analyzing'
  | 'preparing_report'
  | 'success'
  | 'error';
