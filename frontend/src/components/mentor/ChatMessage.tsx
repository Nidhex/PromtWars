import React, { useState } from 'react';
import { MentorMessage } from '../../types/mentor';
import { Bot, User, Sparkles, Copy, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ChatMessageProps {
  message: MentorMessage;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const isStudent = message.sender === 'student';
  const isSystem = message.sender === 'system';

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (isSystem) {
    return (
      <div className="p-3 rounded-lg bg-surface-900/80 border border-surface-700/40 text-center text-xs font-mono text-cyan-300 flex items-center justify-center gap-2 my-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>{message.content}</span>
      </div>
    );
  }

  return (
    <div className={cn('flex items-start gap-3 my-4', isStudent ? 'flex-row-reverse' : 'flex-row')}>
      {/* Avatar */}
      <div
        className={cn(
          'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs shadow-md',
          isStudent
            ? 'bg-brand-600 text-white'
            : 'bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white shadow-cyan-500/20'
        )}
      >
        {isStudent ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Bubble Content */}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-3',
          isStudent
            ? 'bg-brand-600/90 text-white rounded-tr-none shadow-md'
            : 'bg-surface-900 border border-surface-700/60 text-slate-200 rounded-tl-none shadow-md'
        )}
      >
        {/* Main Text */}
        <div className="whitespace-pre-wrap font-sans text-xs">{message.content}</div>

        {/* Formatted Code Snippets */}
        {message.codeSnippets && message.codeSnippets.length > 0 && (
          <div className="space-y-2 pt-1">
            {message.codeSnippets.map((snippet, idx) => (
              <div key={idx} className="rounded-lg bg-surface-950 border border-surface-700/60 overflow-hidden">
                <div className="px-3 py-1.5 bg-surface-900 border-b border-surface-700/40 flex items-center justify-between font-mono text-[10px] text-slate-400">
                  <span>{snippet.fileName || snippet.language}</span>
                  <button
                    onClick={() => handleCopyCode(snippet.code, idx)}
                    className="flex items-center gap-1 hover:text-slate-100 transition-colors focus-ring rounded"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* Suggested Next Actions */}
        {message.suggestedNextActions && message.suggestedNextActions.length > 0 && (
          <div className="pt-2 border-t border-surface-700/40 space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
              Suggested Next Engineering Steps:
            </span>
            <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
              {message.suggestedNextActions.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-[10px] font-mono text-slate-400 text-right">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
