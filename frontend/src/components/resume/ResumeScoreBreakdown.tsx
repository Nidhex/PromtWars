import React from 'react';
import { CategoryScoreBreakdown } from '../../types/resume';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { BarChart3, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ResumeScoreBreakdownProps {
  breakdown: CategoryScoreBreakdown[];
}

export const ResumeScoreBreakdown: React.FC<ResumeScoreBreakdownProps> = ({ breakdown }) => {
  return (
    <Card className="bg-surface-900 border border-surface-700/60 shadow-xl">
      <CardHeader>
        <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>Transparent 7-Category Score Breakdown</span>
        </CardTitle>
        <p className="text-xs text-slate-400">
          Deterministic scoring rules based on structure, skills, contact completeness, bullet metrics, and parsing readability.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {breakdown.map((cat) => {
            const percent = Math.round((cat.score / cat.maxScore) * 100);
            const isHigh = percent >= 80;

            return (
              <div
                key={cat.category}
                className="p-3.5 rounded-2xl bg-surface-950/70 border border-surface-700/50 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    {isHigh ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    )}
                    <span>{cat.category}</span>
                  </span>

                  <span className="font-mono font-bold text-slate-300">
                    {cat.score} / {cat.maxScore} pts ({percent}%)
                  </span>
                </div>

                <div className="w-full bg-surface-900 rounded-full h-2 overflow-hidden border border-surface-700/40">
                  <div
                    className={
                      isHigh
                        ? 'bg-emerald-400 h-full rounded-full transition-all duration-500'
                        : 'bg-amber-400 h-full rounded-full transition-all duration-500'
                    }
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                  {cat.feedback}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
