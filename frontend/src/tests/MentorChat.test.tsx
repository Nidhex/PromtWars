import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MentorChat } from '../components/mentor/MentorChat';
import { ProjectIdea } from '../types/project';
import { MentorMessage, SuggestedPrompt } from '../types/mentor';

const mockProject: ProjectIdea = {
  id: 'proj_test_1',
  title: 'Smart Healthcare Screener',
  tagline: 'AI Medical Assistant',
  domain: 'Healthcare & MedTech',
  difficulty: 'Moderate',
  estimatedWeeks: 12,
  scores: {
    overall: 88,
    skillMatch: 90,
    interestMatch: 85,
    feasibility: 92,
    innovation: 86,
    technicalDepth: 88,
  },
  problemStatement: 'Manual trial screening is slow.',
  proposedSolution: 'RAG LLM screener.',
  targetUsers: ['Researchers'],
  keyFeatures: ['Feature 1'],
  aiComponents: ['Gemini API'],
  techStack: { frontend: ['React'], backend: ['Express'], aiMl: ['Gemini'], database: ['PostgreSQL'], cloudDeploy: ['Render'] },
  whyThisFitsYou: ['Matches skills'],
  risks: [],
  recommendations: [],
  hardwareRequirements: ['Laptop'],
  prerequisites: ['React'],
  createdAt: '2026-09-05T00:00:00.000Z',
};

const mockMessages: MentorMessage[] = [
  {
    id: 'm1',
    sender: 'student',
    content: 'What should I build first?',
    timestamp: '2026-09-05T10:00:00.000Z',
  },
  {
    id: 'm2',
    sender: 'mentor',
    content: 'Start with the Express backend service wrapper.',
    timestamp: '2026-09-05T10:00:02.000Z',
  },
];

const mockSuggestions: SuggestedPrompt[] = [
  { id: 's1', label: 'Explain Architecture', prompt: 'Explain architecture', category: 'architecture' },
  { id: 's2', label: 'Check Feasibility', prompt: 'Check feasibility', category: 'feasibility' },
];

describe('MentorChat Workspace Component', () => {
  it('renders loaded project context, messages, and starter suggestions', () => {
    render(
      <MentorChat
        project={mockProject}
        blueprint={{ architecturePattern: 'RAG Architecture' }}
        messages={mockMessages}
        suggestedPrompts={mockSuggestions}
        sending={false}
        onSendMessage={vi.fn()}
      />
    );

    expect(screen.getByText('Smart Healthcare Screener')).toBeInTheDocument();
    expect(screen.getByText('What should I build first?')).toBeInTheDocument();
    expect(screen.getByText('Start with the Express backend service wrapper.')).toBeInTheDocument();
    expect(screen.getByText('Explain Architecture')).toBeInTheDocument();
  });

  it('triggers onSendMessage when a suggested prompt chip is clicked', () => {
    const handleSend = vi.fn();
    render(
      <MentorChat
        project={mockProject}
        messages={mockMessages}
        suggestedPrompts={mockSuggestions}
        sending={false}
        onSendMessage={handleSend}
      />
    );

    const suggestionChip = screen.getByText('Explain Architecture');
    fireEvent.click(suggestionChip);

    expect(handleSend).toHaveBeenCalledWith('Explain architecture');
  });

  it('renders error alert banner when error is present', () => {
    render(
      <MentorChat
        project={mockProject}
        messages={[]}
        suggestedPrompts={[]}
        sending={false}
        error="Network error communicating with AI Mentor"
        onSendMessage={vi.fn()}
        onRetry={vi.fn()}
      />
    );

    expect(screen.getByText('AI Mentor Connection Failed')).toBeInTheDocument();
    expect(screen.getByText('Network error communicating with AI Mentor')).toBeInTheDocument();
    expect(screen.getByText('Retry Message')).toBeInTheDocument();
  });
});
