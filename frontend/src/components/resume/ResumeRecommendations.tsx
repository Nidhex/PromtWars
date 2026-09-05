import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { CheckSquare, MessageSquareText, ShieldAlert } from 'lucide-react';

interface ResumeRecommendationsProps {
  topImprovements: string[];
  overallAssessment: string;
}

export const ResumeRecommendations: React.FC<ResumeRecommendationsProps> = ({
  topImprovements,
  overallAssessment,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Top Actionable Improvements Checklist */}
      <Card className="md:col-span-2 bg-surface-900 border border-surface-700/60 shadow-xl">
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <span>Top Priority Improvement Checklist</span>
          </CardTitle>
          <p className="text-xs text-slate-400">
            Actionable steps to increase your ATS compatibility score and recruiter callback rate.
          </p>
        </CardHeader>

        <CardContent>
          <div className="space-y-2.5">
            {topImprovements.map((imp, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-surface-950/70 border border-surface-700/50 flex items-start gap-3 text-xs text-slate-200"
              >
                <span className="w-5 h-5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 font-mono font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-relaxed font-medium">{imp}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recruiter Overall Assessment */}
      <Card className="bg-surface-900 border border-surface-700/60 shadow-xl flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
            <MessageSquareText className="w-4 h-4 text-cyan-400" />
            <span>Recruiter Overall Assessment</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-xs text-slate-300 leading-relaxed italic bg-surface-950/70 p-4 rounded-2xl border border-surface-700/50">
            "{overallAssessment}"
          </p>

          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-[11px] text-cyan-300 flex items-center gap-2 font-mono">
            <ShieldAlert className="w-4 h-4 shrink-0 text-cyan-400" />
            <span>Scores & feedback are computed deterministically + via Gemini AI.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
