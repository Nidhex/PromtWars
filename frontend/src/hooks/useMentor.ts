import { useState, useEffect, useCallback } from 'react';
import { MentorMessage, MentorContext, SuggestedPrompt } from '../types/mentor';
import { mentorService } from '../services/mentorService';

export function useMentor(projectId: string = 'proj_medtech_01') {
  const [messages, setMessages] = useState<MentorMessage[]>([]);
  const [context, setContext] = useState<MentorContext | null>(null);
  const [suggestedPrompts, setSuggestedPrompts] = useState<SuggestedPrompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadMentorData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [msgRes, ctxRes, prmtRes] = await Promise.all([
        mentorService.getMessages(projectId),
        mentorService.getContext(projectId),
        mentorService.getSuggestedPrompts(projectId),
      ]);

      if (msgRes.success && msgRes.data) setMessages(msgRes.data);
      if (ctxRes.success && ctxRes.data) setContext(ctxRes.data);
      if (prmtRes.success && prmtRes.data) setSuggestedPrompts(prmtRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to AI Mentor');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadMentorData();
  }, [loadMentorData]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    setSending(true);
    try {
      // Add optimistic student message
      const tempStudentMsg: MentorMessage = {
        id: `temp_${Date.now()}`,
        sender: 'student',
        content,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, tempStudentMsg]);

      const res = await mentorService.sendMessage(projectId, content);
      if (res.success && res.data) {
        // Replace temp and add reply
        setMessages((prev) => [...prev.filter((m) => m.id !== tempStudentMsg.id), tempStudentMsg, res.data!]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error sending mentor message');
    } finally {
      setSending(false);
    }
  };

  const clearChat = async () => {
    await mentorService.clearHistory();
    loadMentorData();
  };

  return {
    messages,
    context,
    suggestedPrompts,
    loading,
    sending,
    error,
    sendMessage,
    clearChat,
    refreshMentor: loadMentorData,
  };
}
