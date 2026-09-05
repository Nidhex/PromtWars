import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useMentor } from '../../hooks/useMentor';
import { MentorChat } from '../../components/mentor/MentorChat';
import { VoiceInputModal } from '../../components/voice/VoiceInputModal';
import { LoadingState } from '../../components/common/LoadingState';

export const MentorPage: React.FC = () => {
  const {
    project,
    blueprint,
    messages,
    suggestedPrompts,
    loading,
    sending,
    error,
    sendMessage,
    retryLastMessage,
  } = useMentor();

  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  if (loading) {
    return (
      <AppShell>
        <LoadingState label="Loading AI Project Mentor context..." />
      </AppShell>
    );
  }

  return (
    <AppShell activeProjectTitle={project?.title}>
      <MentorChat
        project={project}
        blueprint={blueprint}
        messages={messages}
        suggestedPrompts={suggestedPrompts}
        sending={sending}
        error={error}
        onSendMessage={sendMessage}
        onRetry={retryLastMessage}
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
