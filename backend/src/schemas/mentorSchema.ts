import { z } from 'zod';

export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1).max(3000),
});

export const mentorProjectContextSchema = z.object({
  id: z.string().optional(),
  title: z.string().default('Untitled Engineering Project'),
  tagline: z.string().optional().default(''),
  domain: z.string().optional().default('Artificial Intelligence'),
  difficulty: z.string().optional().default('Moderate'),
  estimatedWeeks: z.number().optional().default(12),
  problemStatement: z.string().optional().default(''),
  proposedSolution: z.string().optional().default(''),
  targetUsers: z.array(z.string()).optional().default([]),
  keyFeatures: z.array(z.string()).optional().default([]),
  aiComponents: z.array(z.string()).optional().default([]),
  techStack: z
    .object({
      frontend: z.array(z.string()).optional().default([]),
      backend: z.array(z.string()).optional().default([]),
      aiMl: z.array(z.string()).optional().default([]),
      database: z.array(z.string()).optional().default([]),
      cloudDeploy: z.array(z.string()).optional().default([]),
    })
    .optional()
    .default({}),
  whyThisFitsYou: z.array(z.string()).optional().default([]),
  overallFitScore: z.number().optional().default(85),
});

export const mentorBlueprintContextSchema = z.object({
  id: z.string().optional(),
  architecturePattern: z.string().optional().default('Client-Server RAG Architecture'),
  frontendDetails: z.string().optional().default('React, TypeScript, TailwindCSS'),
  backendDetails: z.string().optional().default('Node.js Express / Python FastAPI'),
  databaseDetails: z.string().optional().default('PostgreSQL / pgvector'),
  aiMlPipelineDetails: z.string().optional().default('Gemini API LLM Integration'),
  apiEndpoints: z.array(z.string()).optional().default([]),
  dataFlowDescription: z.string().optional().default(''),
  securityConsiderations: z.array(z.string()).optional().default([]),
  deploymentStrategy: z.string().optional().default('Cloud PaaS (Vercel / Render)'),
});

export const mentorStudentContextSchema = z.object({
  experienceLevel: z.string().optional().default('intermediate'),
  duration: z.string().optional().default('3 months'),
  teamSize: z.union([z.string(), z.number()]).optional().default(2),
  difficulty: z.string().optional().default('Moderate'),
  resources: z.array(z.string()).optional().default([]),
  preferredTechnologies: z.array(z.string()).optional().default([]),
  excludedTechnologies: z.array(z.string()).optional().default([]),
});

export const mentorChatRequestSchema = z.object({
  project: mentorProjectContextSchema.optional().default({}),
  blueprint: mentorBlueprintContextSchema.optional().default({}),
  studentContext: mentorStudentContextSchema.optional().default({}),
  messages: z.array(chatMessageSchema).max(20, 'Maximum 20 history messages allowed').optional().default([]),
  message: z.string().trim().min(1, 'Message cannot be empty').max(2000, 'Message cannot exceed 2000 characters'),
});

export type MentorChatRequestInput = z.infer<typeof mentorChatRequestSchema>;
