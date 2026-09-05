import { MentorMessage, SuggestedPrompt, MentorChatPayload } from '../types/mentor';
import { ServiceResponse } from '../types/common';

const BACKEND_URL = (import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:3001';

export const STARTER_SUGGESTIONS: SuggestedPrompt[] = [
  {
    id: 'sug_arch',
    label: 'Explain Architecture',
    prompt: 'Explain my project architecture and data flow.',
    category: 'architecture',
  },
  {
    id: 'sug_first',
    label: 'What to build first?',
    prompt: 'What feature should I build first to make quick progress?',
    category: 'scope',
  },
  {
    id: 'sug_feasibility',
    label: 'Check Feasibility',
    prompt: 'Check my project feasibility for a 3-month timeline.',
    category: 'feasibility',
  },
  {
    id: 'sug_scope',
    label: 'Reduce Scope',
    prompt: 'How can I simplify this project to reduce scope if needed?',
    category: 'scope',
  },
  {
    id: 'sug_viva',
    label: 'Prepare for Viva',
    prompt: 'Explain this project like I have an academic viva evaluation tomorrow.',
    category: 'viva',
  },
  {
    id: 'sug_ai',
    label: 'AI & ML Pipeline',
    prompt: 'Explain the AI/ML approach and how models are integrated.',
    category: 'ai_pipeline',
  },
];

export const mentorService = {
  async getSuggestedPrompts(_projectId?: string): Promise<ServiceResponse<SuggestedPrompt[]>> {
    return {
      success: true,
      data: STARTER_SUGGESTIONS,
      timestamp: new Date().toISOString(),
    };
  },

  async sendMentorChatMessage(
    payload: MentorChatPayload
  ): Promise<ServiceResponse<MentorMessage>> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/mentor/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        return {
          success: false,
          error: json.error || json.message || `Backend Error (${response.status}): ${response.statusText}`,
          timestamp: new Date().toISOString(),
        };
      }

      const mentorReply: MentorMessage = {
        id: `msg_mentor_${Date.now()}`,
        sender: 'mentor',
        content: json.data?.reply || 'No response returned from AI Mentor.',
        timestamp: json.data?.timestamp || new Date().toISOString(),
      };

      return {
        success: true,
        data: mentorReply,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Network error communicating with backend API';
      return {
        success: false,
        error: `Unable to connect to AI Mentor server (${BACKEND_URL}): ${msg}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
};
