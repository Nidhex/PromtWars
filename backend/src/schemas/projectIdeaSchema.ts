import { z } from 'zod';

export const riskItemSchema = z.object({
  category: z.enum(['technical', 'scope', 'data', 'hardware']).default('technical'),
  severity: z.enum(['low', 'medium', 'high']).default('medium'),
  description: z.string(),
  mitigation: z.string(),
});

export const recommendationItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  impact: z.enum(['high', 'medium', 'low']).default('medium'),
});

export const techStackSchema = z.object({
  frontend: z.array(z.string()).default([]),
  backend: z.array(z.string()).default([]),
  aiMl: z.array(z.string()).default([]),
  database: z.array(z.string()).default([]),
  cloudDeploy: z.array(z.string()).default([]),
});

export const singleProjectIdeaSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  tagline: z.string().min(1),
  domain: z.string().min(1),
  difficulty: z.enum(['Beginner-Friendly', 'Moderate', 'Challenging', 'Advanced', 'Research-Grade']).default('Moderate'),
  estimatedWeeks: z.number().int().min(1).max(52).default(12),
  problemStatement: z.string().min(1),
  proposedSolution: z.string().min(1),
  targetUsers: z.array(z.string()).min(1),
  keyFeatures: z.array(z.string()).min(1),
  aiComponents: z.array(z.string()).min(1),
  techStack: techStackSchema,
  whyThisFitsYou: z.array(z.string()).min(1),
  feasibilityReasoning: z.string(),
  innovationScore: z.number().int().min(0).max(100),
  feasibilityScore: z.number().int().min(0).max(100),
  skillMatchScore: z.number().int().min(0).max(100),
  interestMatchScore: z.number().int().min(0).max(100),
  technologyMatchScore: z.number().int().min(0).max(100),
  difficultyFitScore: z.number().int().min(0).max(100),
  timeFeasibilityScore: z.number().int().min(0).max(100),
  risks: z.array(riskItemSchema).default([]),
  recommendations: z.array(recommendationItemSchema).default([]),
  hardwareRequirements: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
});

export const projectIdeasResponseSchema = z.object({
  projects: z.array(singleProjectIdeaSchema).length(3, 'Gemini must return exactly 3 project ideas'),
});

export type SingleProjectIdea = z.infer<typeof singleProjectIdeaSchema>;
export type ProjectIdeasResponse = z.infer<typeof projectIdeasResponseSchema>;

// OpenAPI / TypeBox / Gemini JSON Schema definition
export const geminiJsonSchema = {
  type: 'object',
  properties: {
    projects: {
      type: 'array',
      description: 'List of exactly 3 personalized project ideas',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          tagline: { type: 'string' },
          domain: { type: 'string' },
          difficulty: {
            type: 'string',
            enum: ['Beginner-Friendly', 'Moderate', 'Challenging', 'Advanced', 'Research-Grade'],
          },
          estimatedWeeks: { type: 'integer' },
          problemStatement: { type: 'string' },
          proposedSolution: { type: 'string' },
          targetUsers: { type: 'array', items: { type: 'string' } },
          keyFeatures: { type: 'array', items: { type: 'string' } },
          aiComponents: { type: 'array', items: { type: 'string' } },
          techStack: {
            type: 'object',
            properties: {
              frontend: { type: 'array', items: { type: 'string' } },
              backend: { type: 'array', items: { type: 'string' } },
              aiMl: { type: 'array', items: { type: 'string' } },
              database: { type: 'array', items: { type: 'string' } },
              cloudDeploy: { type: 'array', items: { type: 'string' } },
            },
            required: ['frontend', 'backend', 'aiMl', 'database', 'cloudDeploy'],
          },
          whyThisFitsYou: { type: 'array', items: { type: 'string' } },
          feasibilityReasoning: { type: 'string' },
          innovationScore: { type: 'integer' },
          feasibilityScore: { type: 'integer' },
          skillMatchScore: { type: 'integer' },
          interestMatchScore: { type: 'integer' },
          technologyMatchScore: { type: 'integer' },
          difficultyFitScore: { type: 'integer' },
          timeFeasibilityScore: { type: 'integer' },
          risks: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                category: { type: 'string', enum: ['technical', 'scope', 'data', 'hardware'] },
                severity: { type: 'string', enum: ['low', 'medium', 'high'] },
                description: { type: 'string' },
                mitigation: { type: 'string' },
              },
              required: ['category', 'severity', 'description', 'mitigation'],
            },
          },
          recommendations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                impact: { type: 'string', enum: ['high', 'medium', 'low'] },
              },
              required: ['title', 'description', 'impact'],
            },
          },
          hardwareRequirements: { type: 'array', items: { type: 'string' } },
          prerequisites: { type: 'array', items: { type: 'string' } },
        },
        required: [
          'id',
          'title',
          'tagline',
          'domain',
          'difficulty',
          'estimatedWeeks',
          'problemStatement',
          'proposedSolution',
          'targetUsers',
          'keyFeatures',
          'aiComponents',
          'techStack',
          'whyThisFitsYou',
          'feasibilityReasoning',
          'innovationScore',
          'feasibilityScore',
          'skillMatchScore',
          'interestMatchScore',
          'technologyMatchScore',
          'difficultyFitScore',
          'timeFeasibilityScore',
          'risks',
          'recommendations',
          'hardwareRequirements',
          'prerequisites',
        ],
      },
    },
  },
  required: ['projects'],
};
