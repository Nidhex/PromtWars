import { ProjectDiscoveryInput, ProjectIdea } from '../types/project';
import { ServiceResponse } from '../types/common';
import { projectService } from './projectService';

const BACKEND_URL = (import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:3001';

export const projectDiscoveryService = {
  async generateProjectIdeas(
    input: ProjectDiscoveryInput,
    onProgressUpdate?: (stage: string, percent: number) => void
  ): Promise<ServiceResponse<ProjectIdea[]>> {
    const stages = [
      { text: 'Connecting to Gemini AI Engine...', percent: 20 },
      { text: 'Analyzing skills, constraints & domain parameters...', percent: 40 },
      { text: 'Evaluating technical feasibility & architecture...', percent: 60 },
      { text: 'Structuring personalized project blueprints...', percent: 80 },
      { text: 'Finalizing fit metrics & recommendations...', percent: 100 },
    ];

    let progressIndex = 0;
    const progressInterval = setInterval(() => {
      if (progressIndex < stages.length - 1) {
        const stage = stages[progressIndex];
        onProgressUpdate?.(stage.text, stage.percent);
        progressIndex++;
      }
    }, 400);

    try {
      const payload = {
        domains: input.domains.length > 0 ? input.domains : ['Artificial Intelligence'],
        heroPromptText: input.heroPromptText || '',
        intent: input.intentText || '',
        experienceLevel: input.experienceLevel,
        duration: `${input.durationMonths} months`,
        teamSize: input.teamSize,
        difficulty: input.difficulty,
        resources: input.resources,
        preferredTechnologies: input.preferredTech,
        excludedTechnologies: input.avoidedTech,
        resumeContext: input.resumeFileName ? `Uploaded Resume Document: ${input.resumeFileName}` : null,
      };

      const response = await fetch(`${BACKEND_URL}/api/projects/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      clearInterval(progressInterval);
      onProgressUpdate?.(stages[stages.length - 1].text, 100);

      const json = await response.json();

      if (!response.ok || !json.success) {
        const errorMessage = json.error || json.message || `Backend Error (${response.status}): ${response.statusText}`;
        return {
          success: false,
          error: errorMessage,
          timestamp: new Date().toISOString(),
        };
      }

      const rawItems = Array.isArray(json.data) ? json.data : [];

      const generatedProjects: ProjectIdea[] = rawItems.map((b: any, idx: number) => ({
        id: b.id || `gen_proj_${Date.now()}_${idx}`,
        title: b.title || 'Untitled AI Project Concept',
        tagline: b.tagline || 'Personalized AI Engineering Project Concept',
        domain: b.domain || (input.domains[0] || 'Artificial Intelligence'),
        difficulty: b.difficulty || input.difficulty || 'Moderate',
        estimatedWeeks: typeof b.estimatedWeeks === 'number' ? b.estimatedWeeks : 12,
        scores: {
          overall: b.overallFitScore ?? 85,
          skillMatch: b.skillMatchScore ?? 85,
          interestMatch: b.interestMatchScore ?? 85,
          feasibility: b.feasibilityScore ?? 85,
          innovation: b.innovationScore ?? 85,
          technicalDepth: b.technologyMatchScore ?? 85,
        },
        problemStatement: b.problemStatement || 'Problem statement for this project concept.',
        proposedSolution: b.proposedSolution || 'Proposed AI solution.',
        targetUsers: Array.isArray(b.targetUsers) ? b.targetUsers : ['Students', 'Engineers'],
        keyFeatures: Array.isArray(b.keyFeatures) ? b.keyFeatures : ['AI feature 1', 'AI feature 2'],
        aiComponents: Array.isArray(b.aiComponents) ? b.aiComponents : ['Gemini API integration'],
        techStack: {
          frontend: b.techStack?.frontend || ['React', 'TypeScript'],
          backend: b.techStack?.backend || ['Node.js', 'Express'],
          aiMl: b.techStack?.aiMl || ['Gemini API'],
          database: b.techStack?.database || ['PostgreSQL'],
          cloudDeploy: b.techStack?.cloudDeploy || ['Vercel', 'Render'],
        },
        whyThisFitsYou: Array.isArray(b.whyThisFitsYou)
          ? b.whyThisFitsYou
          : ['Matches your selected domain interest and technical background.'],
        risks: Array.isArray(b.risks)
          ? b.risks.map((r: any, rIdx: number) => ({
              id: `risk_${rIdx}_${Date.now()}`,
              category: r.category || 'technical',
              severity: r.severity || 'medium',
              description: r.description || 'Risk description',
              mitigation: r.mitigation || 'Mitigation strategy',
            }))
          : [],
        recommendations: Array.isArray(b.recommendations)
          ? b.recommendations.map((rec: any, recIdx: number) => ({
              id: `rec_${recIdx}_${Date.now()}`,
              title: rec.title || 'Recommendation',
              description: rec.description || 'Recommendation detail',
              impact: rec.impact || 'medium',
            }))
          : [],
        hardwareRequirements: Array.isArray(b.hardwareRequirements) ? b.hardwareRequirements : ['Standard laptop'],
        prerequisites: Array.isArray(b.prerequisites) ? b.prerequisites : ['Basic programming knowledge'],
        createdAt: new Date().toISOString(),
      }));

      if (generatedProjects.length === 0) {
        return {
          success: false,
          error: 'No project concepts returned by AI. Please try again.',
          timestamp: new Date().toISOString(),
        };
      }

      // Store generated projects so DiscoverPage renders them
      projectService.setProjects(generatedProjects);

      return {
        success: true,
        data: generatedProjects,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      clearInterval(progressInterval);
      const msg = error instanceof Error ? error.message : 'Network error communicating with backend API';
      return {
        success: false,
        error: `Unable to connect to backend server (${BACKEND_URL}): ${msg}. Please verify backend service is running.`,
        timestamp: new Date().toISOString(),
      };
    }
  },
};
