import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Layers, Cpu, Clock, ShieldAlert } from 'lucide-react';
import { ProjectIdea } from '../../types/project';
import { Badge } from '../ui/Badge';

interface MentorProjectContextProps {
  project?: ProjectIdea | null;
  blueprint?: any;
}

export const MentorProjectContext: React.FC<MentorProjectContextProps> = ({ project, blueprint }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!project) {
    return (
      <div className="p-4 rounded-2xl bg-surface-900 border border-surface-700/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>AI Project Mentor (General Engineering Context)</span>
        </div>
        <Badge variant="outline" size="sm">No Project Selected</Badge>
      </div>
    );
  }

  const techStackSummary = project.techStack
    ? Object.values(project.techStack).flat().join(' · ')
    : 'React · TypeScript · Express · Gemini API';

  return (
    <div className="rounded-2xl bg-surface-900 border border-surface-700/60 overflow-hidden shadow-lg transition-all">
      {/* Context Header Bar */}
      <div
        onClick={() => setIsExpanded((prev) => !prev)}
        className="p-4 cursor-pointer hover:bg-surface-800/60 transition-colors flex items-center justify-between gap-4 select-none"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                AI CONTEXT LOADED
              </span>
              <Badge variant="cyan" size="sm">
                Fit Score: {project.scores?.overall ?? 85}/100
              </Badge>
            </div>
            <h3 className="text-sm font-bold text-white truncate mt-0.5">{project.title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            {isExpanded ? 'Hide Blueprint' : 'View Blueprint Context'}
          </span>
          <button
            type="button"
            className="p-1 rounded-lg bg-surface-950 border border-surface-700 text-slate-300 hover:text-white"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Context Blueprint Details */}
      {isExpanded && (
        <div className="p-4 border-t border-surface-700/60 bg-surface-950/60 space-y-3 text-xs animate-in fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-2.5 rounded-xl bg-surface-900 border border-surface-700/50 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <Layers className="w-3 h-3 text-cyan-400" /> Architecture Pattern
              </span>
              <p className="font-semibold text-slate-200 truncate">
                {blueprint?.architecturePattern || 'Client-Server RAG Pipeline'}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-surface-900 border border-surface-700/50 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <Cpu className="w-3 h-3 text-brand-400" /> Tech Stack
              </span>
              <p className="font-semibold text-slate-200 truncate">{techStackSummary}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-surface-900 border border-surface-700/50 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-400" /> Timeline & Scope
              </span>
              <p className="font-semibold text-slate-200">
                {project.estimatedWeeks || 12} Weeks • {project.difficulty}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-surface-900 border border-surface-700/50 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-400" /> Identified Risks
              </span>
              <p className="font-semibold text-slate-200">
                {project.risks?.length || 0} Risk Factor(s) Analyzed
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic">
            💡 The AI Project Mentor has read this project's full blueprint, hardware constraints, and technical stack.
          </p>
        </div>
      )}
    </div>
  );
};
