import React, { useState, useRef, useEffect } from 'react';
import { MentorMessage, MentorContext, SuggestedPrompt } from '../../types/mentor';
import { ChatMessage } from './ChatMessage';
import { SuggestedPromptList } from './SuggestedPromptList';
import { ProjectContextCard } from './ProjectContextCard';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Send, Trash2, Mic, Sparkles } from 'lucide-react';

export interface MentorPanelProps {
  messages: MentorMessage[];
  context: MentorContext | null;
  suggestedPrompts: SuggestedPrompt[];
  sending: boolean;
  onSendMessage: (content: string) => void;
  onClearChat: () => void;
  onVoiceClick?: () => void;
}

export const MentorPanel: React.FC<MentorPanelProps> = ({
  messages,
  context,
  suggestedPrompts,
  sending,
  onSendMessage,
  onClearChat,
  onVoiceClick,
}) => {
  const [inputContent, setInputContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sending]);

  const handleSend = () => {
    if (!inputContent.trim() || sending) return;
    onSendMessage(inputContent);
    setInputContent('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4 flex flex-col h-[calc(100vh-8rem)]">
      {/* Pinned Context Header */}
      {context && <ProjectContextCard context={context} />}

      {/* Main Chat Scroll Container */}
      <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-surface-950/40 border border-surface-700/60 space-y-2">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {sending && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-900/60 border border-brand-500/30 text-xs text-brand-300 animate-pulse my-2">
            <Sparkles className="w-4 h-4 text-brand-400 animate-spin" />
            <span>AI Mentor analyzing architecture context and generating advice...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <SuggestedPromptList
        prompts={suggestedPrompts}
        onSelectPrompt={(prmt) => onSendMessage(prmt)}
      />

      {/* Input Form Bar */}
      <div className="p-3 rounded-xl bg-surface-900 border border-surface-700/60 flex items-end gap-3 shadow-lg">
        {onVoiceClick && (
          <button
            onClick={onVoiceClick}
            aria-label="Voice input trigger"
            className="p-2.5 rounded-lg bg-surface-800 hover:bg-surface-700 text-brand-400 border border-surface-700 transition-colors focus-ring"
          >
            <Mic className="w-4 h-4" />
          </button>
        )}

        <div className="flex-1 min-w-0">
          <Textarea
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI Mentor about scope, tech stack trade-offs, architecture, or roadmap tasks (Shift+Enter for new line)..."
            rows={2}
            className="text-xs bg-surface-950 border-surface-700/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClearChat}
            aria-label="Clear chat history"
            className="p-2.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors focus-ring"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <Button
            variant="primary"
            size="md"
            onClick={handleSend}
            isLoading={sending}
            disabled={!inputContent.trim()}
            rightIcon={<Send className="w-3.5 h-3.5" />}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
