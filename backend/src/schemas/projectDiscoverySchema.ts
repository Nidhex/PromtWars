import { z } from 'zod';

export const projectDiscoverySchema = z.object({
  domains: z
    .array(z.string().trim())
    .transform((val) => (val.length === 0 ? ['Artificial Intelligence'] : val))
    .default(['Artificial Intelligence']),
  heroPromptText: z.string().max(1000).optional().default(''),
  intent: z.string().max(2000).optional().default(''),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
  duration: z.union([z.string(), z.number()]).default('3 months'),
  teamSize: z.union([z.string(), z.number()]).default(2),
  difficulty: z
    .enum(['Beginner', 'Intermediate', 'Advanced', 'Beginner-Friendly', 'Moderate', 'Challenging', 'Research-Grade'])
    .default('Moderate'),
  resources: z.array(z.string()).max(10).default([]),
  preferredTechnologies: z.array(z.string()).max(20).default([]),
  excludedTechnologies: z.array(z.string()).max(20).default([]),
  resumeContext: z.string().max(5000).nullable().optional(),
});

export type ProjectDiscoveryInputSchema = z.infer<typeof projectDiscoverySchema>;
