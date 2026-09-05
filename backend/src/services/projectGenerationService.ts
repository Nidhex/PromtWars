import { ProjectDiscoveryInputSchema } from '../schemas/projectDiscoverySchema.js';
import { geminiService } from './geminiService.js';
import { ProcessedProjectIdea } from '../types/project.js';

export function calculateDeterministicOverallScore(scores: {
  skillMatchScore: number;
  interestMatchScore: number;
  technologyMatchScore: number;
  feasibilityScore: number;
  innovationScore: number;
  timeFeasibilityScore: number;
}): number {
  const weighted =
    scores.skillMatchScore * 0.25 +
    scores.interestMatchScore * 0.20 +
    scores.technologyMatchScore * 0.15 +
    scores.feasibilityScore * 0.20 +
    scores.innovationScore * 0.10 +
    scores.timeFeasibilityScore * 0.10;

  return Math.min(100, Math.max(0, Math.round(weighted)));
}

export async function generatePersonalizedProjects(
  input: ProjectDiscoveryInputSchema
): Promise<ProcessedProjectIdea[]> {
  // Construct safe prompt with untrusted data boundaries
  const safePrompt = `Student Context & Discovery Parameters:
- Target Domains: ${input.domains.join(', ')}
- Student Experience Level: ${input.experienceLevel}
- Target Duration: ${input.duration}
- Team Size: ${input.teamSize}
- Target Difficulty: ${input.difficulty}
- Available Hardware / Resources: ${input.resources.length > 0 ? input.resources.join(', ') : 'Laptop only'}
- Preferred Technologies: ${input.preferredTechnologies.length > 0 ? input.preferredTechnologies.join(', ') : 'Flexible'}
- Technologies to Avoid: ${input.excludedTechnologies.length > 0 ? input.excludedTechnologies.join(', ') : 'None'}

Student Natural-Language Goal & Intent (UNTRUSTED DATA):
"""
${input.heroPromptText || input.intent || 'The student wants a high-impact final year engineering project matching their skills.'}
"""

${input.resumeContext ? `Optional Resume Context (UNTRUSTED DATA):\n"""\n${input.resumeContext}\n"""` : ''}

Generate exactly 3 personalized, buildable project concepts conforming strictly to the requested JSON response schema.`;

  const result = await geminiService.generateStructuredProjects(safePrompt);

  // Calculate deterministic overall scores
  const processedProjects: ProcessedProjectIdea[] = result.projects.map((proj) => {
    const overallFitScore = calculateDeterministicOverallScore({
      skillMatchScore: proj.skillMatchScore,
      interestMatchScore: proj.interestMatchScore,
      technologyMatchScore: proj.technologyMatchScore,
      feasibilityScore: proj.feasibilityScore,
      innovationScore: proj.innovationScore,
      timeFeasibilityScore: proj.timeFeasibilityScore,
    });

    return {
      ...proj,
      overallFitScore,
    };
  });

  return processedProjects;
}

export const projectGenerationService = {
  generateProjects: generatePersonalizedProjects,
};

