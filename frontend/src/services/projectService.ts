import { ProjectIdea, ProjectFilterState } from '../types/project';
import { ServiceResponse } from '../types/common';
import { mockProjectIdeas } from './mockData';

let projectsStore: ProjectIdea[] = [...mockProjectIdeas];

export const projectService = {
  async getProjects(filters?: Partial<ProjectFilterState>): Promise<ServiceResponse<ProjectIdea[]>> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    let result = [...projectsStore];

    if (filters) {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        result = result.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.tagline.toLowerCase().includes(query) ||
            p.domain.toLowerCase().includes(query) ||
            p.keyFeatures.some((f) => f.toLowerCase().includes(query)) ||
            Object.values(p.techStack)
              .flat()
              .some((t) => t.toLowerCase().includes(query))
        );
      }

      if (filters.selectedDomains && filters.selectedDomains.length > 0) {
        result = result.filter((p) => filters.selectedDomains!.includes(p.domain));
      }

      if (filters.selectedDifficulties && filters.selectedDifficulties.length > 0) {
        result = result.filter((p) => filters.selectedDifficulties!.includes(p.difficulty));
      }

      if (filters.minOverallScore !== undefined) {
        result = result.filter((p) => p.scores.overall >= filters.minOverallScore!);
      }

      if (filters.maxWeeks !== undefined) {
        result = result.filter((p) => p.estimatedWeeks <= filters.maxWeeks!);
      }

      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'fit':
            result.sort((a, b) => b.scores.skillMatch - a.scores.skillMatch);
            break;
          case 'feasibility':
            result.sort((a, b) => b.scores.feasibility - a.scores.feasibility);
            break;
          case 'innovation':
            result.sort((a, b) => b.scores.innovation - a.scores.innovation);
            break;
          case 'weeks':
            result.sort((a, b) => a.estimatedWeeks - b.estimatedWeeks);
            break;
          default:
            result.sort((a, b) => b.scores.overall - a.scores.overall);
        }
      }
    }

    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  },

  async getProjectById(id: string): Promise<ServiceResponse<ProjectIdea>> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const project = projectsStore.find((p) => p.id === id);

    if (!project) {
      return {
        success: false,
        error: `Project with ID ${id} not found`,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      data: project,
      timestamp: new Date().toISOString(),
    };
  },

  async generatePersonalizedIdeas(_promptContext?: {
    customInterest?: string;
    targetDomain?: string;
  }): Promise<ServiceResponse<ProjectIdea[]>> {
    // Simulate AI generation latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Return the curated list enriched
    return {
      success: true,
      data: [...projectsStore],
      timestamp: new Date().toISOString(),
    };
  },

  async improveIdea(
    projectId: string,
    instructions: string
  ): Promise<ServiceResponse<ProjectIdea>> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const project = projectsStore.find((p) => p.id === projectId);

    if (!project) {
      return {
        success: false,
        error: 'Project not found',
        timestamp: new Date().toISOString(),
      };
    }

    const updated: ProjectIdea = {
      ...project,
      tagline: `${project.tagline} (Enhanced: ${instructions.slice(0, 40)}...)`,
      scores: {
        ...project.scores,
        overall: Math.min(99, project.scores.overall + 2),
        innovation: Math.min(99, project.scores.innovation + 4),
      },
      recommendations: [
        {
          id: `rec_${Date.now()}`,
          title: 'AI Improvement Applied',
          description: `Customized based on prompt: "${instructions}"`,
          impact: 'high',
        },
        ...project.recommendations,
      ],
    };

    projectsStore = projectsStore.map((p) => (p.id === projectId ? updated : p));

    return {
      success: true,
      data: updated,
      timestamp: new Date().toISOString(),
    };
  },
};
