import React from 'react';
import { ScoreRing } from './ScoreRing';
import { ProjectScores } from '../../types/project';
import { getScoreColorClass } from '../../utils/formatters';
import { Card, CardContent } from '../ui/Card';
import { ShieldCheck, Zap, Sparkles, Code2 } from 'lucide-react';

export interface ScoreCardProps {
  scores: ProjectScores;
  className?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ scores, className }) => {
  const overallColors = getScoreColorClass(scores.overall);

  const metrics = [
    { label: 'Skill Match', value: scores.skillMatch, icon: <Code2 className="w-3.5 h-3.5 text-brand-400" /> },
    { label: 'Interest Match', value: scores.interestMatch, icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> },
    { label: 'Feasibility', value: scores.feasibility, icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> },
    { label: 'Innovation', value: scores.innovation, icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  return (
    <Card className={className}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Main Score Ring */}
          <div className="shrink-0">
            <ScoreRing score={scores.overall} label="PROJECT HEALTH" size="lg" />
          </div>

          {/* Metric Rows */}
          <div className="flex-1 grid grid-cols-2 gap-3 min-w-0">
            {metrics.map((m) => {
              return (
                <div key={m.label} className="bg-surface-950/50 border border-surface-700/40 rounded-lg p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    {m.icon}
                    <span className="text-xs font-medium text-slate-300 truncate">{m.label}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-100 ml-1">
                    {Math.round(m.value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Health Verdict Note */}
        <div className={`mt-4 pt-3 border-t border-surface-700/40 flex items-center justify-between text-xs`}>
          <span className="text-slate-400">AI Compatibility Index:</span>
          <span className={`font-semibold px-2 py-0.5 rounded ${overallColors.bg} ${overallColors.text}`}>
            {scores.overall >= 90 ? 'Excellent Match' : scores.overall >= 75 ? 'Strong Match' : 'Viable'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
