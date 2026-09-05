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
  category: 'scope' | 'architecture' | 'ai_pipeline' | 'debugging' | 'evaluation';
}

export interface MentorContext {
  projectId: string;
  projectTitle: string;
  currentPhaseName: string;
  currentMilestoneTitle: string;
  techStackSummary: string;
  activeRisksCount: number;
  progressPercentage: number;
}
