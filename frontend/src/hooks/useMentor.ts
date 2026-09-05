import { useState, useEffect, useCallback } from 'react';
import { MentorMessage, SuggestedPrompt } from '../types/mentor';
import { ProjectIdea } from '../types/project';
import { mentorService, STARTER_SUGGESTIONS } from '../services/mentorService';
import { projectService } from '../services/projectService';

export function useMentor(projectId?: string) {
  const [project, setProject] = useState<ProjectIdea | null>(null);
  const [blueprint, setBlueprint] = useState<any>(null);
  const [messages, setMessages] = useState<MentorMessage[]>([]);
  const [suggestedPrompts] = useState<SuggestedPrompt[]>(STARTER_SUGGESTIONS);
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadActiveProjectContext = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch active project
      const projRes = await projectService.getProjects();
      if (projRes.success && projRes.data && projRes.data.length > 0) {
        const found = projectId ? projRes.data.find((p) => p.id === projectId) : projRes.data[0];
        const selected = found || projRes.data[0];
        setProject(selected);

        // Construct blueprint context from selected project
        setBlueprint({
          architecturePattern: 'Client-Server RAG Architecture',
          frontendDetails: (selected.techStack?.frontend || ['React', 'TypeScript']).join(', '),
          backendDetails: (selected.techStack?.backend || ['Node.js', 'Express']).join(', '),
          databaseDetails: (selected.techStack?.database || ['PostgreSQL']).join(', '),
          aiMlPipelineDetails: (selected.techStack?.aiMl || ['Gemini API']).join(', '),
          deploymentStrategy: (selected.techStack?.cloudDeploy || ['Vercel', 'Render']).join(', '),
          securityConsiderations: ['Zod Payload Validation', 'CORS Origin Restriction', 'Rate Limiting'],
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project context');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadActiveProjectContext();
  }, [loadActiveProjectContext]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || sending) return;
    setSending(true);
    setError(null);

    const studentMessage: MentorMessage = {
      id: `msg_stu_${Date.now()}`,
      sender: 'student',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [...messages, studentMessage];
    setMessages(updatedHistory);

    try {
      // Format chat history bounded to last 10 messages for token-efficiency
      const formattedHistory = updatedHistory.slice(-10).map((m) => ({
        role: (m.sender === 'student' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.content,
      }));

      const payload = {
        project: project ? {
          title: project.title,
          tagline: project.tagline,
          domain: project.domain,
          difficulty: project.difficulty,
          estimatedWeeks: project.estimatedWeeks,
          problemStatement: project.problemStatement,
          proposedSolution: project.proposedSolution,
          targetUsers: project.targetUsers,
          keyFeatures: project.keyFeatures,
          aiComponents: project.aiComponents,
          techStack: project.techStack,
          overallFitScore: project.scores?.overall ?? 85,
        } : {},
        blueprint: blueprint || {},
        studentContext: {
          experienceLevel: project?.difficulty || 'Moderate',
          duration: `${project?.estimatedWeeks || 12} Weeks`,
          teamSize: 2,
          resources: project?.hardwareRequirements || ['Laptop only'],
        },
        messages: formattedHistory,
        message: content.trim(),
      };

      const res = await mentorService.sendMentorChatMessage(payload);

      if (res.success && res.data) {
        setMessages((prev) => [...prev, res.data!]);
      } else {
        setError(res.error || 'AI Mentor failed to respond.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error communicating with AI Mentor');
    } finally {
      setSending(false);
    }
  };

  const retryLastMessage = () => {
    const lastStudentMsg = [...messages].reverse().find((m) => m.sender === 'student');
    if (lastStudentMsg) {
      sendMessage(lastStudentMsg.content);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return {
    project,
    blueprint,
    messages,
    suggestedPrompts,
    loading,
    sending,
    error,
    sendMessage,
    retryLastMessage,
    clearChat,
    refreshMentor: loadActiveProjectContext,
  };
}
