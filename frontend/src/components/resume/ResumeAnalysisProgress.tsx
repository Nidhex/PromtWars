import React from 'react';
import { AnalysisStage } from '../../types/resume';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ResumeAnalysisProgressProps {
  stage: AnalysisStage;
  progressPercent: number;
}

const STAGES: { stageKey: AnalysisStage; label: string }[] = [
  { stageKey: 'uploading', label: 'Uploading Resume File' },
  { stageKey: 'extracting', label: 'Extracting Resume Text' },
  { stageKey: 'checking_ats', label: 'Evaluating ATS Compatibility' },
  { stageKey: 'analyzing', label: 'Qualitative AI Analysis' },
  { stageKey: 'preparing_report', label: 'Preparing Report' },
];

export const ResumeAnalysisProgress: React.FC<ResumeAnalysisProgressProps> = ({
  stage,
  progressPercent,
}) => {
  const currentStageIndex = STAGES.findIndex((s) => s.stageKey === stage);

  return (
    <div className="p-6 rounded-2xl bg-surface-900 border border-brand-500/40 max-w-xl mx-auto space-y-5 shadow-2xl animate-in fade-in">
      <div className="flex items-center justify-center gap-2.5 text-sm font-bold text-brand-300">
        <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />
        <span>Resume ATS Engineering Pipeline In Progress</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-cyan-300">
            {STAGES[Math.max(0, currentStageIndex)]?.label || 'Processing Document...'}
          </span>
          <span className="text-slate-400 font-bold">{progressPercent}%</span>
        </div>

        <div className="w-full bg-surface-950 rounded-full h-2.5 overflow-hidden border border-surface-700/60 shadow-inner">
          <div
            className="bg-gradient-to-r from-brand-500 via-indigo-400 to-cyan-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-1.5 pt-1">
        {STAGES.map((st, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          return (
            <div
              key={st.stageKey}
              className={cn(
                'flex items-center justify-between text-xs font-mono px-3 py-1.5 rounded-lg transition-colors',
                isCurrent && 'bg-surface-950 text-cyan-300 font-bold border border-cyan-500/30',
                isDone && 'text-emerald-400 opacity-80',
                !isDone && !isCurrent && 'text-slate-500'
              )}
            >
              <span className="flex items-center gap-2">
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-700 inline-block" />
                )}
                <span>{st.label}</span>
              </span>

              {isDone && <span className="text-[10px] uppercase font-bold text-emerald-400">Done</span>}
              {isCurrent && <span className="text-[10px] uppercase font-bold text-cyan-400">Running...</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
