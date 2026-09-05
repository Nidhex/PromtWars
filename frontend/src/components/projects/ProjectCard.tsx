import React from 'react';
import { ProjectIdea } from '../../types/project';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ScoreRing } from '../scores/ScoreRing';
import { ArrowRight, Clock, Layers, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface ProjectCardProps {
  project: ProjectIdea;
  onCompareToggle?: (projectId: string) => void;
  isCompared?: boolean;
  onSelectProject?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onCompareToggle,
  isCompared = false,
  onSelectProject,
}) => {
  const navigate = useNavigate();

  const handleBuildThis = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectProject?.(project.id);
    navigate(`/projects/${project.id}`);
  };

  return (
    <Card variant="interactive" className="flex flex-col justify-between group h-full">
      {/* Header with domain & duration */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="cyan" size="sm" className="font-semibold">
            {project.domain}
          </Badge>
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{project.estimatedWeeks} Wks</span>
          </div>
        </div>

        <CardTitle className="group-hover:text-brand-300 transition-colors text-base sm:text-lg">
          {project.title}
        </CardTitle>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>
      </CardHeader>

      {/* Content with Score Ring & Key Features */}
      <CardContent className="space-y-4 py-3 flex-1">
        {/* Score Ring Section */}
        <div className="p-3 rounded-xl bg-surface-950/60 border border-surface-700/40 flex items-center justify-between">
          <ScoreRing score={project.scores.overall} label="FIT MATCH" size="sm" />

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-right text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Feasibility</span>
              <span className="font-mono font-bold text-emerald-400">
                {Math.round(project.scores.feasibility)}%
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Innovation</span>
              <span className="font-mono font-bold text-amber-400">
                {Math.round(project.scores.innovation)}%
              </span>
            </div>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div>
          <span className="text-[10px] uppercase font-mono font-semibold text-slate-400 block mb-1.5 flex items-center gap-1">
            <Layers className="w-3 h-3 text-brand-400" />
            <span>Tech Stack:</span>
          </span>
          <div className="flex flex-wrap gap-1">
            {project.techStack.frontend.slice(0, 2).map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-surface-800 text-slate-300 font-mono">
                {t}
              </span>
            ))}
            {project.techStack.backend.slice(0, 2).map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-surface-800 text-slate-300 font-mono">
                {t}
              </span>
            ))}
            {project.techStack.aiMl.slice(0, 1).map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-brand-500/15 text-cyan-300 border border-cyan-500/30 font-mono">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Why this fits preview */}
        {project.whyThisFitsYou.length > 0 && (
          <div className="text-[11px] text-slate-300 bg-surface-950/40 p-2.5 rounded-lg border border-surface-700/30 line-clamp-2">
            <Sparkles className="w-3 h-3 text-cyan-400 inline mr-1" />
            <span>{project.whyThisFitsYou[0]}</span>
          </div>
        )}
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="gap-2 pt-3">
        {onCompareToggle && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompareToggle(project.id);
            }}
            className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${
              isCompared
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-surface-800 hover:bg-surface-700 text-slate-300 border-surface-700'
            }`}
          >
            {isCompared ? 'Compared ✓' : 'Compare'}
          </button>
        )}

        <Button
          variant="primary"
          size="sm"
          onClick={handleBuildThis}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="w-full justify-between"
        >
          <span>Build This</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
