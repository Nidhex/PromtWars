import { SingleProjectIdea } from '../schemas/projectIdeaSchema.js';

export type ProjectDomain =
  | 'Healthcare & MedTech'
  | 'EdTech & Learning'
  | 'FinTech & Security'
  | 'DevTools & AI Agents'
  | 'Sustainability & IoT'
  | 'Accessibility & Assistive Tech'
  | 'Creative & Generative Media'
  | 'Artificial Intelligence'
  | 'Machine Learning'
  | 'Web Development'
  | 'Mobile Development'
  | 'Cybersecurity'
  | 'Data Science'
  | 'Computer Vision'
  | 'Cloud & DevOps'
  | 'IoT & Robotics'
  | 'Blockchain';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Beginner-Friendly' | 'Moderate' | 'Challenging' | 'Research-Grade';

export interface ProcessedProjectIdea extends SingleProjectIdea {
  overallFitScore: number;
}
