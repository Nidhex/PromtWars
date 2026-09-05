export type MessageSender = 'student' | 'mentor' | 'system';

export interface CodeSnippet {
  language: string;
  code: string;
  fileName?: string;
}

export interface MentorMessage {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  codeSnippets?: CodeSnippet[];
  suggestedNextActions?: string[];
  referencedMilestoneId?: string;
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  prompt: string;
  category: 'scope' | 'architecture' | 'ai_pipeline' | 'viva' | 'feasibility';
}

export interface MentorContext {
  projectId: string;
  projectTitle: string;
  domain: string;
  difficulty: string;
  overallFitScore: number;
  architecturePattern: string;
  techStackSummary: string;
  timeline: string;
  teamSize: number;
  activeRisksCount: number;
}

export interface MentorChatPayload {
  project?: any;
  blueprint?: any;
  studentContext?: any;
  messages?: Array<{ role: 'user' | 'assistant'; content: string }>;
  message: string;
}
