import React, { useEffect, useRef } from 'react';
import { MentorMessage as MentorMessageType, SuggestedPrompt } from '../../types/mentor';
import { ProjectIdea } from '../../types/project';
import { MentorProjectContext } from './MentorProjectContext';
import { MentorSuggestions } from './MentorSuggestions';
import { MentorMessage } from './MentorMessage';
import { MentorInput } from './MentorInput';
import { AlertCircle, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface MentorChatProps {
  project?: ProjectIdea | null;
  blueprint?: any;
  messages: MentorMessageType[];
  suggestedPrompts: SuggestedPrompt[];
  sending: boolean;
  error?: string | null;
  onSendMessage: (content: string) => void;
  onRetry?: () => void;
  onVoiceClick?: () => void;
}

export const MentorChat: React.FC<MentorChatProps> = ({
  project,
  blueprint,
  messages,
  suggestedPrompts,
  sending,
  error,
  onSendMessage,
  onRetry,
  onVoiceClick,
}) => {
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBottomRef.current && typeof chatBottomRef.current.scrollIntoView === 'function') {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, sending]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)] min-h-[550px]">
      {/* Top Project & Blueprint Context Summary */}
      <MentorProjectContext project={project} blueprint={blueprint} />

      {/* Main Chat Messages Stream Window */}
      <div className="flex-1 bg-surface-950/80 border border-surface-700/60 rounded-3xl p-4 sm:p-6 overflow-y-auto space-y-4 shadow-inner custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 my-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <h3 className="text-base font-bold text-white">AI Project Engineering Mentor</h3>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Based on your project blueprint for <strong className="text-cyan-300">{project?.title || 'your selected project'}</strong>,
              ask me anything about architecture, technical feasibility, AI pipelines, database schemas, or viva evaluation strategy.
            </p>
          </div>
        ) : (
          messages.map((msg) => <MentorMessage key={msg.id} message={msg} />)
        )}

        {sending && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface-900 border border-brand-500/30 text-brand-300 text-xs font-mono animate-pulse w-fit">
            <Loader2 className="w-4 h-4 text-brand-400 animate-spin" />
            <span>AI Mentor analyzing project blueprint & constructing response...</span>
          </div>
        )}

        {/* Error Alert Display */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 flex items-start gap-3 text-left animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-2 flex-1">
              <h4 className="text-xs font-bold text-rose-200">AI Mentor Connection Failed</h4>
              <p className="text-xs text-rose-300/90 leading-relaxed">{error}</p>
              {onRetry && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  className="text-xs border-rose-500/40 text-rose-200 hover:bg-rose-900/40 mt-1"
                >
                  Retry Message
                </Button>
              )}
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Action Chips */}
      <MentorSuggestions
        suggestions={suggestedPrompts}
        onSelectSuggestion={onSendMessage}
        disabled={sending}
      />

      {/* Accessible Input Form */}
      <MentorInput
        onSendMessage={onSendMessage}
        onVoiceClick={onVoiceClick}
        disabled={sending}
      />
    </div>
  );
};
