import React from 'react';
import { JobMatchResult } from '../../types/resume';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { CheckCircle2, AlertCircle, HelpCircle, KeyRound } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface ResumeKeywordAnalysisProps {
  jobMatch?: JobMatchResult | null;
  keywordRecommendations?: string[];
}

export const ResumeKeywordAnalysis: React.FC<ResumeKeywordAnalysisProps> = ({
  jobMatch,
  keywordRecommendations,
}) => {
  return (
    <Card className="bg-surface-900 border border-surface-700/60 shadow-xl">
      <CardHeader>
        <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-cyan-400" />
          <span>Keyword & Technical Skills Analysis</span>
        </CardTitle>
        <p className="text-xs text-slate-400">
          Target role keyword coverage analysis. Add missing keywords ONLY if you genuinely possess the corresponding technical skill.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {jobMatch ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Matched Keywords */}
            <div className="p-4 rounded-2xl bg-surface-950/70 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="w-4 h-4" /> Matched ({jobMatch.matchedKeywords.length})
                </span>
                <Badge variant="emerald" size="sm">Strong</Badge>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {jobMatch.matchedKeywords.length > 0 ? (
                  jobMatch.matchedKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                    >
                      ✓ {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">No direct matches found.</span>
                )}
              </div>
            </div>

            {/* Weak / Single Occurrence Keywords */}
            <div className="p-4 rounded-2xl bg-surface-950/70 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-amber-400 flex items-center gap-1.5 uppercase">
                  <HelpCircle className="w-4 h-4" /> Weak Coverage ({jobMatch.weakKeywords.length})
                </span>
                <Badge variant="amber" size="sm">1 Mentions</Badge>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {jobMatch.weakKeywords.length > 0 ? (
                  jobMatch.weakKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-300"
                    >
                      ⚠ {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">No weak keywords.</span>
                )}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="p-4 rounded-2xl bg-surface-950/70 border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-rose-400 flex items-center gap-1.5 uppercase">
                  <AlertCircle className="w-4 h-4" /> Missing Keywords ({jobMatch.missingKeywords.length})
                </span>
                <Badge variant="rose" size="sm">Add If Skilled</Badge>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {jobMatch.missingKeywords.length > 0 ? (
                  jobMatch.missingKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-rose-500/10 border border-rose-500/30 text-rose-300"
                    >
                      + {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-400 font-mono">All JD keywords matched!</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-surface-950/60 border border-surface-700/40 text-xs text-slate-300 space-y-2">
            <p className="font-bold text-slate-200">General Keyword Recommendations:</p>
            {keywordRecommendations && keywordRecommendations.length > 0 ? (
              <ul className="space-y-1.5 font-mono">
                {keywordRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400">Ensure relevant core engineering framework keywords are listed explicitly under your technical skills section.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
