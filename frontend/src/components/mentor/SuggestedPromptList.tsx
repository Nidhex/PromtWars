import React from 'react';
import { SuggestedPrompt } from '../../types/mentor';
import { Sparkles } from 'lucide-react';

export interface SuggestedPromptListProps {
  prompts: SuggestedPrompt[];
  onSelectPrompt: (promptText: string) => void;
}

export const SuggestedPromptList: React.FC<SuggestedPromptListProps> = ({
  prompts,
  onSelectPrompt,
}) => {
  if (prompts.length === 0) return null;

  return (
    <div className="space-y-2">
      <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>Contextual Quick Questions:</span>
      </span>

      <div className="flex flex-wrap gap-2">
        {prompts.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectPrompt(p.prompt)}
            className="text-xs px-3 py-1.5 rounded-lg bg-surface-900 border border-surface-700/60 hover:border-brand-500/50 hover:bg-surface-800 text-slate-300 hover:text-white transition-all text-left focus-ring"
          >
            <span className="font-semibold text-brand-300 mr-1.5">[{p.label}]</span>
            <span>{p.prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
