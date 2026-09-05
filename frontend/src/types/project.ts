export type ProjectDomain =
  | 'Healthcare & MedTech'
  | 'EdTech & Learning'
  | 'FinTech & Security'
  | 'DevTools & AI Agents'
  | 'Sustainability & IoT'
  | 'Accessibility & Assistive Tech'
  | 'Creative & Generative Media';

export type DifficultyLevel = 'Beginner-Friendly' | 'Moderate' | 'Advanced' | 'Research-Grade';

export interface ProjectScores {
  overall: number; // 0-100
  skillMatch: number; // 0-100
  interestMatch: number; // 0-100
  feasibility: number; // 0-100
  innovation: number; // 0-100
  technicalDepth: number; // 0-100
}

export interface RiskItem {
  id: string;
  category: 'technical' | 'scope' | 'data' | 'hardware';
  severity: 'low' | 'medium' | 'high';
  description: string;
  mitigation: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

export interface ProjectIdea {
  id: string;
  title: string;
  tagline: string;
  domain: ProjectDomain;
  difficulty: DifficultyLevel;
  estimatedWeeks: number;
  scores: ProjectScores;
  problemStatement: string;
  proposedSolution: string;
  targetUsers: string[];
  keyFeatures: string[];
  aiComponents: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    aiMl: string[];
    database: string[];
    cloudDeploy: string[];
  };
  whyThisFitsYou: string[];
  risks: RiskItem[];
  recommendations: Recommendation[];
  hardwareRequirements: string[];
  prerequisites: string[];
  createdAt: string;
}

export interface ProjectFilterState {
  searchQuery: string;
  selectedDomains: ProjectDomain[];
  selectedDifficulties: DifficultyLevel[];
  minOverallScore: number;
  maxWeeks: number;
  selectedTech: string[];
  sortBy: 'fit' | 'feasibility' | 'innovation' | 'difficulty' | 'weeks';
}
