import { MentorMessage, MentorContext, SuggestedPrompt } from '../types/mentor';
import { ServiceResponse } from '../types/common';
import { mockMentorHistory, mockSuggestedPrompts } from './mockData';

let messageHistory: MentorMessage[] = [...mockMentorHistory];

export const mentorService = {
  async getMessages(_projectId: string): Promise<ServiceResponse<MentorMessage[]>> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return {
      success: true,
      data: [...messageHistory],
      timestamp: new Date().toISOString(),
    };
  },

  async getContext(projectId: string): Promise<ServiceResponse<MentorContext>> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const context: MentorContext = {
      projectId,
      projectTitle: 'MedTrial AI: Patient Eligibility & Risk Screener',
      currentPhaseName: 'Phase 2: RAG & Vector Search Engine',
      currentMilestoneTitle: 'Milestone 3: ClinicalTrials.gov Syncer & Vector Index',
      techStackSummary: 'React · TypeScript · FastAPI · PostgreSQL · pgvector · Gemini API',
      activeRisksCount: 2,
      progressPercentage: 45,
    };

    return {
      success: true,
      data: context,
      timestamp: new Date().toISOString(),
    };
  },

  async getSuggestedPrompts(_projectId: string): Promise<ServiceResponse<SuggestedPrompt[]>> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      success: true,
      data: [...mockSuggestedPrompts],
      timestamp: new Date().toISOString(),
    };
  },

  async sendMessage(
    _projectId: string,
    content: string
  ): Promise<ServiceResponse<MentorMessage>> {
    // 1. Add student message
    const studentMsg: MentorMessage = {
      id: `msg_stu_${Date.now()}`,
      sender: 'student',
      content,
      timestamp: new Date().toISOString(),
    };
    messageHistory.push(studentMsg);

    // 2. Simulate AI engineering analysis latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 3. Generate context-aware mentor response
    let responseText = `I analyzed your question regarding the current project stage (**Phase 2: RAG & Vector Search Engine**).\n\nHere is the recommended engineering approach:\n\n1. **Boundary Isolation**: Ensure all vector transformations are abstracted behind a clean repository interface so swapping embedding models won't break your retrieval pipeline.\n2. **Confidence Calibration**: Apply a softmax temperature layer over cosine similarity scores to prevent low-similarity false matches from entering the LLM prompt.\n3. **Test Invariant**: Add a unit test verifying that contraindication assertions fail gracefully when similarity score is under 0.72.`;

    if (content.toLowerCase().includes('scope') || content.toLowerCase().includes('weeks')) {
      responseText = `Looking at your **12-week timeline** and current progress (45%), your core scope is solid. \n\n**Advice:** Keep the FHIR standard parser as an optional *Phase 4 stretch goal*. Prioritize the deterministic inclusion/exclusion verification with Gemini 1.5 Pro first, as that is the core differentiator judges will look for.`;
    } else if (content.toLowerCase().includes('database') || content.toLowerCase().includes('pgvector')) {
      responseText = `For your architecture with under 100k trial criteria chunks, **PostgreSQL with the \`pgvector\` extension (HNSW index)** is optimal. You avoid paying for separate vector SaaS like Pinecone, maintain ACID relational transactions for patient audits, and simplify deployment to a single Google Cloud SQL instance.`;
    }

    const mentorReply: MentorMessage = {
      id: `msg_mentor_${Date.now()}`,
      sender: 'mentor',
      content: responseText,
      timestamp: new Date().toISOString(),
      suggestedNextActions: [
        'Review database vector indexing schema in Blueprint',
        'Mark task as in progress in Roadmap',
      ],
      referencedMilestoneId: 'ms_3',
    };

    messageHistory.push(mentorReply);

    return {
      success: true,
      data: mentorReply,
      timestamp: new Date().toISOString(),
    };
  },

  async clearHistory(): Promise<ServiceResponse<boolean>> {
    messageHistory = [mockMentorHistory[0]];
    return {
      success: true,
      data: true,
      timestamp: new Date().toISOString(),
    };
  },
};
