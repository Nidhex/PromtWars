import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useMentor } from '../../hooks/useMentor';
import { MentorPanel } from '../../components/mentor/MentorPanel';
import { VoiceInputModal } from '../../components/voice/VoiceInputModal';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';

export const MentorPage: React.FC = () => {
  const {
    messages,
    context,
    suggestedPrompts,
    loading,
    sending,
    error,
    sendMessage,
    clearChat,
    refreshMentor,
  } = useMentor('proj_medtech_01');

  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  if (loading) {
    return (
      <AppShell>
        <LoadingState label="Connecting to AI Project Mentor..." />
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <ErrorState message={error} onRetry={refreshMentor} />
      </AppShell>
    );
  }

  return (
    <AppShell activeProjectTitle={context?.projectTitle}>
      <MentorPanel
        messages={messages}
        context={context}
        suggestedPrompts={suggestedPrompts}
        sending={sending}
        onSendMessage={sendMessage}
        onClearChat={clearChat}
        onVoiceClick={() => setVoiceModalOpen(true)}
      />

      <VoiceInputModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onTranscriptReady={(transcript) => sendMessage(transcript.rawText)}
      />
    </AppShell>
  );
};
