import { describe, it, expect, vi } from 'vitest';
import { calculateDeterministicOverallScore, generatePersonalizedProjects } from '../services/projectGenerationService.js';
import { projectDiscoverySchema } from '../schemas/projectDiscoverySchema.js';
import { geminiService } from '../services/geminiService.js';

describe('Project Generation Score Calculator', () => {
  it('calculates weighted overall fit score accurately', () => {
    const score = calculateDeterministicOverallScore({
      skillMatchScore: 90,
      interestMatchScore: 80,
      technologyMatchScore: 100,
      feasibilityScore: 85,
      innovationScore: 70,
      timeFeasibilityScore: 95,
    });

    expect(score).toBe(87);
  });

  it('clamps scores between 0 and 100', () => {
    const scoreHigh = calculateDeterministicOverallScore({
      skillMatchScore: 120,
      interestMatchScore: 120,
      technologyMatchScore: 120,
      feasibilityScore: 120,
      innovationScore: 120,
      timeFeasibilityScore: 120,
    });
    expect(scoreHigh).toBe(100);

    const scoreLow = calculateDeterministicOverallScore({
      skillMatchScore: -10,
      interestMatchScore: -10,
      technologyMatchScore: -10,
      feasibilityScore: -10,
      innovationScore: -10,
      timeFeasibilityScore: -10,
    });
    expect(scoreLow).toBe(0);
  });
});

describe('Project Discovery Input Schema', () => {
  it('validates a valid input payload', () => {
    const payload = {
      domains: ['Web Development'],
      heroPromptText: 'Building AI tools for students',
      intent: 'Building AI tools for students',
      experienceLevel: 'intermediate',
      duration: '3 months',
      teamSize: 1,
      difficulty: 'Moderate',
      resources: ['Laptop only'],
      preferredTechnologies: ['React', 'Express'],
      excludedTechnologies: [],
    };

    const result = projectDiscoverySchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('defaults empty domains gracefully', () => {
    const payload = {
      domains: [],
    };

    const result = projectDiscoverySchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.domains).toEqual(['Artificial Intelligence']);
    }
  });
});

describe('Dynamic AI Context Passing & Gemini Failure Handling', () => {
  it('TEST 1 & TEST 2: passes Machine Learning + Healthcare vs Cybersecurity contexts to Gemini', async () => {
    const spy = vi.spyOn(geminiService, 'generateStructuredProjects').mockResolvedValue({
      projects: [
        {
          id: 'proj_mock_1',
          title: 'Mock Project Concept',
          tagline: 'Mock Tagline',
          domain: 'Cybersecurity',
          difficulty: 'Moderate',
          estimatedWeeks: 8,
          problemStatement: 'Problem',
          proposedSolution: 'Solution',
          targetUsers: ['Users'],
          keyFeatures: ['Feature 1'],
          aiComponents: ['AI 1'],
          techStack: {
            frontend: ['React'],
            backend: ['Node.js'],
            aiMl: ['Python'],
            database: ['PostgreSQL'],
            cloudDeploy: ['Vercel'],
          },
          whyThisFitsYou: ['Fits background'],
          feasibilityReasoning: 'Highly feasible',
          innovationScore: 85,
          feasibilityScore: 90,
          skillMatchScore: 88,
          interestMatchScore: 85,
          technologyMatchScore: 90,
          difficultyFitScore: 85,
          timeFeasibilityScore: 90,
          risks: [],
          recommendations: [],
          hardwareRequirements: ['Laptop'],
          prerequisites: ['Basics'],
        },
      ],
    });

    const request1 = {
      domains: ['Machine Learning', 'Healthcare & MedTech'],
      heroPromptText: 'AI for early disease diagnosis',
      intent: 'AI for early disease diagnosis',
      experienceLevel: 'intermediate' as const,
      duration: '3 months',
      teamSize: 2,
      difficulty: 'Moderate' as const,
      resources: ['Laptop only'],
      preferredTechnologies: ['PyTorch', 'Python'],
      excludedTechnologies: [],
    };

    await generatePersonalizedProjects(request1);
    expect(spy).toHaveBeenLastCalledWith(expect.stringContaining('Machine Learning, Healthcare & MedTech'));
    expect(spy).toHaveBeenLastCalledWith(expect.stringContaining('PyTorch, Python'));

    const request2 = {
      domains: ['Cybersecurity'],
      heroPromptText: 'Security monitoring system',
      intent: 'Security monitoring system',
      experienceLevel: 'beginner' as const,
      duration: '1 month',
      teamSize: 1,
      difficulty: 'Beginner' as const,
      resources: ['Laptop only'],
      preferredTechnologies: ['Python'],
      excludedTechnologies: ['PHP'],
    };

    await generatePersonalizedProjects(request2);
    expect(spy).toHaveBeenLastCalledWith(expect.stringContaining('Cybersecurity'));
    expect(spy).toHaveBeenLastCalledWith(expect.stringContaining('Security monitoring system'));
    expect(spy).toHaveBeenLastCalledWith(expect.stringContaining('Technologies to Avoid: PHP'));

    spy.mockRestore();
  });

  it('TEST 4 & 5: simulates Gemini failure and verifies error is thrown without returning static fallback projects', async () => {
    const spy = vi.spyOn(geminiService, 'generateStructuredProjects').mockRejectedValue(
      new Error('AI_GENERATION_FAILED: Gemini API call failed')
    );

    const req = {
      domains: ['Cybersecurity'],
      heroPromptText: 'Security scanner',
      intent: 'Security scanner',
      experienceLevel: 'intermediate' as const,
      duration: '2 months',
      teamSize: 1,
      difficulty: 'Moderate' as const,
      resources: ['Laptop only'],
      preferredTechnologies: ['Python'],
      excludedTechnologies: [],
    };

    await expect(generatePersonalizedProjects(req)).rejects.toThrow('AI_GENERATION_FAILED');
    spy.mockRestore();
  });
});
