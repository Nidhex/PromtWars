import React from 'react';
import { ATSScoreResult, JobMatchResult, ResumeTextMetadata } from '../../types/resume';
import { ShieldCheck, FileText, Target, Award } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface ResumeScoreCardProps {
  atsScore: ATSScoreResult;
  metadata: ResumeTextMetadata;
  jobMatch?: JobMatchResult | null;
}

export const ResumeScoreCard: React.FC<ResumeScoreCardProps> = ({
  atsScore,
  metadata,
  jobMatch,
}) => {
  const getRatingBadgeVariant = (rating: string) => {
    switch (rating) {
      case 'Strong':
        return 'emerald';
      case 'Moderate':
        return 'amber';
      default:
        return 'rose';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Primary ATS Compatibility Score Radial / Badge */}
      <div className="md:col-span-2 p-6 rounded-3xl bg-surface-900 border border-surface-700/60 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="54"
              className="text-surface-950 stroke-current"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="54"
              className="text-brand-500 stroke-current transition-all duration-1000"
              strokeWidth="10"
              strokeDasharray={339.29}
              strokeDashoffset={339.29 - (339.29 * atsScore.totalScore) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-white tracking-tight">{atsScore.totalScore}</span>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">OUT OF 100</span>
          </div>
        </div>

        <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Badge variant={getRatingBadgeVariant(atsScore.rating) as any} size="md" className="font-bold font-mono">
              <Award className="w-3.5 h-3.5 mr-1" />
              {atsScore.rating.toUpperCase()} RATING
            </Badge>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              ATS COMPATIBILITY SCORE
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Resume Readability & ATS Ranking Analysis
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed">
            Evaluated deterministically across 7 structural categories including Contact details, Section hierarchy, Action verbs, Technical keywords, and Content formatting.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-slate-400 pt-1 border-t border-surface-700/50">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              {metadata.format.toUpperCase()} Document ({metadata.wordCount} Words)
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              In-Memory Privacy Verified
            </span>
          </div>
        </div>
      </div>

      {/* Target Job Match Score Card (If Job Description provided) */}
      <div className="p-6 rounded-3xl bg-surface-900 border border-surface-700/60 shadow-2xl flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold text-slate-200 uppercase">
              JOB MATCH OVERLAP
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Target Role</span>
        </div>

        {jobMatch ? (
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-cyan-400">{jobMatch.jobMatchScore}%</span>
              <span className="text-xs font-mono text-slate-300 font-semibold">Keyword Match</span>
            </div>

            <div className="w-full bg-surface-950 rounded-full h-2 overflow-hidden border border-surface-700/60">
              <div
                className="bg-gradient-to-r from-brand-500 to-cyan-400 h-full rounded-full"
                style={{ width: `${jobMatch.jobMatchScore}%` }}
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {jobMatch.alignmentFeedback}
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-surface-950/60 border border-surface-700/40 text-center space-y-2 my-auto">
            <p className="text-xs text-slate-400">
              No target job description was attached for role-specific keyword matching.
            </p>
            <p className="text-[11px] text-cyan-400 font-mono italic">
              Showing General Engineering ATS Score
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
