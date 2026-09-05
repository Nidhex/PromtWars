import { Roadmap, MilestoneStatus } from '../types/roadmap';
import { ServiceResponse } from '../types/common';
import { mockRoadmap } from './mockData';

let roadmapStore: Roadmap = JSON.parse(JSON.stringify(mockRoadmap));

function recalculateProgress(roadmap: Roadmap): number {
  let totalTasks = 0;
  let completedTasks = 0;

  for (const phase of roadmap.phases) {
    for (const milestone of phase.milestones) {
      for (const task of milestone.tasks) {
        totalTasks++;
        if (task.completed) {
          completedTasks++;
        }
      }
    }
  }

  return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
}

export const roadmapService = {
  async getRoadmapByProjectId(projectId: string): Promise<ServiceResponse<Roadmap>> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    roadmapStore.projectId = projectId;
    roadmapStore.overallProgressPercentage = recalculateProgress(roadmapStore);

    return {
      success: true,
      data: { ...roadmapStore },
      timestamp: new Date().toISOString(),
    };
  },

  async toggleTaskCompletion(
    milestoneId: string,
    taskId: string
  ): Promise<ServiceResponse<Roadmap>> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    for (const phase of roadmapStore.phases) {
      const milestone = phase.milestones.find((m) => m.id === milestoneId);
      if (milestone) {
        const task = milestone.tasks.find((t) => t.id === taskId);
        if (task) {
          task.completed = !task.completed;

          // Auto-adjust milestone status
          const allTasksCompleted = milestone.tasks.every((t) => t.completed);
          const anyTaskCompleted = milestone.tasks.some((t) => t.completed);

          if (allTasksCompleted) {
            milestone.status = 'completed';
          } else if (anyTaskCompleted) {
            milestone.status = 'in_progress';
          } else {
            milestone.status = 'not_started';
          }
        }
      }
    }

    roadmapStore.overallProgressPercentage = recalculateProgress(roadmapStore);

    return {
      success: true,
      data: { ...roadmapStore },
      timestamp: new Date().toISOString(),
    };
  },

  async updateMilestoneStatus(
    milestoneId: string,
    status: MilestoneStatus
  ): Promise<ServiceResponse<Roadmap>> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    for (const phase of roadmapStore.phases) {
      const milestone = phase.milestones.find((m) => m.id === milestoneId);
      if (milestone) {
        milestone.status = status;
        if (status === 'completed') {
          milestone.tasks.forEach((t) => (t.completed = true));
        }
      }
    }

    roadmapStore.overallProgressPercentage = recalculateProgress(roadmapStore);

    return {
      success: true,
      data: { ...roadmapStore },
      timestamp: new Date().toISOString(),
    };
  },
};
