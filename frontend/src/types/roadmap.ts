export type MilestoneStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked';

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  estimatedHours: number;
  assignedRole?: string;
}

export interface Milestone {
  id: string;
  phaseId: string;
  order: number;
  title: string;
  tagline: string;
  description: string;
  durationWeeks: number;
  status: MilestoneStatus;
  technologies: string[];
  tasks: TaskItem[];
  deliverables: string[];
  dependencies: string[];
  testingChecklist: string[];
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  name: string;
  description: string;
  milestones: Milestone[];
}

export interface Roadmap {
  projectId: string;
  projectTitle: string;
  totalWeeks: number;
  currentMilestoneId: string;
  phases: RoadmapPhase[];
  overallProgressPercentage: number;
}
