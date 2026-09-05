import { ProjectDiscoveryInput, ProjectIdea } from '../types/project';
import { ServiceResponse } from '../types/common';
import { mockProjectIdeas } from './mockData';

export const projectDiscoveryService = {
  async generateProjectIdeas(
    input: ProjectDiscoveryInput,
    onProgressUpdate?: (stage: string, percent: number) => void
  ): Promise<ServiceResponse<ProjectIdea[]>> {
    const stages = [
      { text: 'Understanding your interests & target domains...', percent: 20 },
      { text: 'Analyzing your experience & hardware resources...', percent: 40 },
      { text: 'Matching your preferred technology stack...', percent: 60 },
      { text: 'Checking feasibility & scope boundaries...', percent: 80 },
      { text: 'Synthesizing personalized project concepts...', percent: 100 },
    ];

    for (const stage of stages) {
      onProgressUpdate?.(stage.text, stage.percent);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    // Filter or enrich project concepts based on discovery input
    let filtered = [...mockProjectIdeas];
    if (input.domains.length > 0) {
      const match = filtered.filter((p) => input.domains.includes(p.domain as any));
      if (match.length > 0) filtered = match;
    }

    return {
      success: true,
      data: filtered,
      timestamp: new Date().toISOString(),
    };
  },
};
