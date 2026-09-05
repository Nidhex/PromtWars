import React, { useState } from 'react';
import { QualitativeResumeAnalysis } from '../../types/resume';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Check, AlertTriangle, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ResumeSectionAnalysisProps {
  analysis: QualitativeResumeAnalysis;
}

export const ResumeSectionAnalysis: React.FC<ResumeSectionAnalysisProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'skills' | 'experience' | 'projects' | 'education' | 'quality'>('experience');

  const sectionsMap = [
    { key: 'summary', label: 'Summary', data: analysis.summaryAnalysis },
    { key: 'skills', label: 'Skills', data: analysis.skillsAnalysis },
    { key: 'experience', label: 'Experience', data: analysis.experienceAnalysis },
    { key: 'projects', label: 'Projects', data: analysis.projectsAnalysis },
    { key: 'education', label: 'Education', data: analysis.educationAnalysis },
    { key: 'quality', label: 'Content Quality', data: analysis.contentQuality },
  ] as const;

  const currentSection = sectionsMap.find((s) => s.key === activeTab)?.data;

  return (
    <div className="space-y-6">
      {/* Section Analysis Tabs */}
      <Card className="bg-surface-900 border border-surface-700/60 shadow-xl">
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Qualitative Section-by-Section Analysis</span>
          </CardTitle>
          <p className="text-xs text-slate-400">
            Qualitative evaluation by Senior Engineering Recruiter AI highlighting strengths, detected issues, and specific recommendations.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-surface-700/60 pb-3">
            {sectionsMap.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-medium font-mono transition-all focus-ring select-none',
                  activeTab === tab.key
                    ? 'bg-brand-600/20 text-brand-300 border border-brand-500 font-semibold shadow-md'
                    : 'bg-surface-950 text-slate-400 hover:text-slate-200 border border-surface-700/50'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {currentSection && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* Strengths */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1.5 uppercase">
                  <Check className="w-4 h-4" /> Detected Strengths
                </span>
                {currentSection.strengths.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentSection.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 italic">No specific strengths flagged in this section.</p>
                )}
              </div>

              {/* Detected Issues */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <span className="text-xs font-bold font-mono text-amber-400 flex items-center gap-1.5 uppercase">
                  <AlertTriangle className="w-4 h-4" /> Areas Needing Work
                </span>
                {currentSection.issues.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentSection.issues.map((iss, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{iss}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-400 font-mono">✓ No critical issues detected in this section.</p>
                )}
              </div>

              {/* Recommendations */}
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                <span className="text-xs font-bold font-mono text-cyan-400 flex items-center gap-1.5 uppercase">
                  <Lightbulb className="w-4 h-4" /> AI Recommendations
                </span>
                {currentSection.recommendations.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentSection.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 italic">Maintain current section presentation.</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Before / After Bullet Point Improvement Suggestions */}
      {analysis.bulletPointSuggestions && analysis.bulletPointSuggestions.length > 0 && (
        <Card className="bg-surface-900 border border-brand-500/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Actionable Bullet Point Improvements (Before vs. After)</span>
            </CardTitle>
            <p className="text-xs text-slate-400">
              Transform passive descriptions into high-impact bullet points with strong action verbs and measurable performance metrics.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {analysis.bulletPointSuggestions.map((sug, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-surface-950/80 border border-surface-700/60 space-y-3 font-mono text-xs"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                    <span className="text-[10px] font-bold text-rose-400 uppercase block">Current Phrase:</span>
                    <p className="text-slate-300 font-normal">"{sug.original}"</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase block flex items-center gap-1">
                      Suggested Action Bullet: <ArrowRight className="w-3 h-3 text-emerald-400" />
                    </span>
                    <p className="text-emerald-200 font-semibold">"{sug.suggested}"</p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  💡 <strong>Reason:</strong> {sug.reason}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
