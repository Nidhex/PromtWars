import React from 'react';
import { Modal } from '../ui/Modal';
import { ProjectIdea } from '../../types/project';
import { ScoreRing } from '../scores/ScoreRing';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface ProjectCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectIdea[];
}

export const ProjectCompareModal: React.FC<ProjectCompareModalProps> = ({
  isOpen,
  onClose,
  projects,
}) => {
  const navigate = useNavigate();

  if (projects.length === 0) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Compare ${projects.length} Selected Projects`}
      description="Side-by-side evaluation of fit, feasibility, timeline, and tech stack alignment."
      maxWidth="4xl"
    >
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-w-[600px]">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl bg-surface-950/60 border border-surface-700/60 flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                  {proj.domain}
                </span>
                <h3 className="text-sm font-bold text-slate-100 mt-2 line-clamp-2">{proj.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.tagline}</p>
              </div>

              <div className="p-3 bg-surface-900 border border-surface-700/40 rounded-lg flex items-center justify-around">
                <ScoreRing score={proj.scores.overall} label="OVERALL" size="sm" />
                <div className="text-right text-xs space-y-0.5">
                  <p className="text-emerald-400 font-mono font-bold">Feasibility: {proj.scores.feasibility}%</p>
                  <p className="text-amber-400 font-mono font-bold">Innovation: {proj.scores.innovation}%</p>
                  <p className="text-slate-400 font-mono">{proj.estimatedWeeks} Weeks</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 block mb-1">Key Tech:</span>
                <div className="flex flex-wrap gap-1">
                  {[...proj.techStack.frontend, ...proj.techStack.backend, ...proj.techStack.aiMl].slice(0, 4).map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-surface-800 text-slate-300 rounded font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onClose();
                  navigate(`/projects/${proj.id}`);
                }}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="w-full"
              >
                Select This Project
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
