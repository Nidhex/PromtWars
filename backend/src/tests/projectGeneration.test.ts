import { describe, it, expect } from 'vitest';
import { calculateDeterministicOverallScore } from '../services/projectGenerationService.js';
import { projectDiscoverySchema } from '../schemas/projectDiscoverySchema.js';

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

    // 90*0.25 (22.5) + 80*0.20 (16) + 100*0.15 (15) + 85*0.20 (17) + 70*0.10 (7) + 95*0.10 (9.5) = 87
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
