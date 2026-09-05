import { z } from 'zod';

export const sectionFeedbackSchema = z.object({
  strengths: z.array(z.string()).default([]),
  issues: z.array(z.string()).default([]),
  recommendations: z.array(z.string()).default([]),
});

export const bulletPointSuggestionSchema = z.object({
  original: z.string(),
  suggested: z.string(),
  reason: z.string(),
});

export const qualitativeResumeAnalysisSchema = z.object({
  summaryAnalysis: sectionFeedbackSchema,
  skillsAnalysis: sectionFeedbackSchema,
  experienceAnalysis: sectionFeedbackSchema,
  projectsAnalysis: sectionFeedbackSchema,
  educationAnalysis: sectionFeedbackSchema,
  contentQuality: sectionFeedbackSchema,
  bulletPointSuggestions: z.array(bulletPointSuggestionSchema).default([]),
  topImprovements: z.array(z.string()).min(1),
  keywordRecommendations: z.array(z.string()).default([]),
  overallAssessment: z.string().min(1),
});

export type QualitativeResumeAnalysisSchema = z.infer<typeof qualitativeResumeAnalysisSchema>;

// OpenAPI / Gemini JSON Schema definition
export const geminiResumeAnalysisJsonSchema = {
  type: 'object',
  properties: {
    summaryAnalysis: {
      type: 'object',
      properties: {
        strengths: { type: 'array', items: { type: 'string' } },
        issues: { type: 'array', items: { type: 'string' } },
        recommendations: { type: 'array', items: { type: 'string' } },
      },
      required: ['strengths', 'issues', 'recommendations'],
    },
    skillsAnalysis: {
      type: 'object',
      properties: {
        strengths: { type: 'array', items: { type: 'string' } },
        issues: { type: 'array', items: { type: 'string' } },
        recommendations: { type: 'array', items: { type: 'string' } },
      },
      required: ['strengths', 'issues', 'recommendations'],
    },
    experienceAnalysis: {
      type: 'object',
      properties: {
        strengths: { type: 'array', items: { type: 'string' } },
        issues: { type: 'array', items: { type: 'string' } },
        recommendations: { type: 'array', items: { type: 'string' } },
      },
      required: ['strengths', 'issues', 'recommendations'],
    },
    projectsAnalysis: {
      type: 'object',
      properties: {
        strengths: { type: 'array', items: { type: 'string' } },
        issues: { type: 'array', items: { type: 'string' } },
        recommendations: { type: 'array', items: { type: 'string' } },
      },
      required: ['strengths', 'issues', 'recommendations'],
    },
    educationAnalysis: {
      type: 'object',
      properties: {
        strengths: { type: 'array', items: { type: 'string' } },
        issues: { type: 'array', items: { type: 'string' } },
        recommendations: { type: 'array', items: { type: 'string' } },
      },
      required: ['strengths', 'issues', 'recommendations'],
    },
    contentQuality: {
      type: 'object',
      properties: {
        strengths: { type: 'array', items: { type: 'string' } },
        issues: { type: 'array', items: { type: 'string' } },
        recommendations: { type: 'array', items: { type: 'string' } },
      },
      required: ['strengths', 'issues', 'recommendations'],
    },
    bulletPointSuggestions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          original: { type: 'string' },
          suggested: { type: 'string' },
          reason: { type: 'string' },
        },
        required: ['original', 'suggested', 'reason'],
      },
    },
    topImprovements: { type: 'array', items: { type: 'string' } },
    keywordRecommendations: { type: 'array', items: { type: 'string' } },
    overallAssessment: { type: 'string' },
  },
  required: [
    'summaryAnalysis',
    'skillsAnalysis',
    'experienceAnalysis',
    'projectsAnalysis',
    'educationAnalysis',
    'contentQuality',
    'bulletPointSuggestions',
    'topImprovements',
    'keywordRecommendations',
    'overallAssessment',
  ],
};
