import React, { useState, useRef, KeyboardEvent } from 'react';
import { Send, Loader2, Mic } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface MentorInputProps {
  onSendMessage: (message: string) => void;
  onVoiceClick?: () => void;
  disabled?: boolean;
}

export const MentorInput: React.FC<MentorInputProps> = ({
  onSendMessage,
  onVoiceClick,
  disabled = false,
}) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(160, textareaRef.current.scrollHeight)}px`;
    }
  };

  return (
    <div className="relative flex items-end gap-2 bg-surface-900 border border-surface-700/80 rounded-2xl p-2 focus-within:border-brand-500 transition-all shadow-xl">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask your AI project mentor anything about architecture, ML approach, feasibility, viva..."
        rows={1}
        className={cn(
          'flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 resize-none px-3 py-2 max-h-40 font-normal',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      />

      <div className="flex items-center gap-1.5 shrink-0 pb-1 pr-1">
        {onVoiceClick && (
          <button
            type="button"
            onClick={onVoiceClick}
            disabled={disabled}
            aria-label="Voice Input"
            className="p-2 rounded-xl text-slate-400 hover:text-brand-400 hover:bg-surface-800 transition-colors focus-ring disabled:opacity-50"
          >
            <Mic className="w-4 h-4" />
          </button>
        )}

        <Button
          type="button"
          variant="gradient"
          size="sm"
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          aria-label="Send Message"
          rightIcon={disabled ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          className="rounded-xl px-4 py-2 font-bold text-xs"
        >
          Send
        </Button>
      </div>
    </div>
  );
};
