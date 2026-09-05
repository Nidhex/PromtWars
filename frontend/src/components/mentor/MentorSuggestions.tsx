import React from 'react';
import { SuggestedPrompt } from '../../types/mentor';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MentorSuggestionsProps {
  suggestions: SuggestedPrompt[];
  onSelectSuggestion: (promptText: string) => void;
  disabled?: boolean;
}

export const MentorSuggestions: React.FC<MentorSuggestionsProps> = ({
  suggestions,
  onSelectSuggestion,
  disabled = false,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>Suggested Mentor Actions</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((sug) => (
          <button
            key={sug.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectSuggestion(sug.prompt)}
            className="group px-3 py-1.5 rounded-xl bg-surface-900 border border-surface-700/60 hover:border-brand-500/50 hover:bg-surface-800 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5 focus-ring disabled:opacity-50 disabled:cursor-not-allowed select-none"
          >
            <span>{sug.label}</span>
            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
};
