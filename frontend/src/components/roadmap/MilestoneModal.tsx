import React from 'react';
import { Modal } from '../ui/Modal';
import { Milestone, MilestoneStatus } from '../../types/roadmap';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { CheckCircle2, Layers, CheckSquare, ShieldCheck } from 'lucide-react';

export interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestone: Milestone | null;
  onToggleTask: (milestoneId: string, taskId: string) => void;
  onUpdateStatus: (milestoneId: string, status: MilestoneStatus) => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  isOpen,
  onClose,
  milestone,
  onToggleTask,
  onUpdateStatus,
}) => {
  if (!milestone) return null;

  const completedCount = milestone.tasks.filter((t) => t.completed).length;
  const totalCount = milestone.tasks.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Milestone 0${milestone.order}: ${milestone.title}`}
      description={milestone.description}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Progress & Quick Status Actions */}
        <div className="p-4 rounded-xl bg-surface-950/60 border border-surface-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono font-semibold">Milestone Status:</span>
              <Badge variant={milestone.status === 'completed' ? 'emerald' : 'cyan'}>
                {milestone.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateStatus(milestone.id, 'in_progress')}
                className="text-xs"
              >
                Set In Progress
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onUpdateStatus(milestone.id, 'completed')}
                leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Mark Complete
              </Button>
            </div>
          </div>

          <ProgressBar value={progress} showValueLabel label="Tasks Progress" variant="emerald" size="md" />
        </div>

        {/* Interactive Task Checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase font-mono flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-cyan-400" />
            <span>Interactive Engineering Tasks ({completedCount}/{totalCount})</span>
          </h4>

          <div className="space-y-2">
            {milestone.tasks.map((task) => (
              <label
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-surface-900 border border-surface-700/60 hover:border-slate-500 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(milestone.id, task.id)}
                  className="mt-0.5 rounded border-slate-700 text-brand-500 focus:ring-brand-500 bg-surface-950"
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold text-slate-100 ${task.completed ? 'line-through text-slate-500' : ''}`}>
                    {task.title}
                  </p>
                  {task.description && <p className="text-[11px] text-slate-400 mt-0.5">{task.description}</p>}
                </div>
                <span className="text-xs font-mono text-slate-400 shrink-0">{task.estimatedHours} hrs</span>
              </label>
            ))}
          </div>
        </div>

        {/* Deliverables & Testing Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-surface-900 border border-surface-700/60 space-y-2">
            <span className="text-xs font-bold text-slate-200 uppercase font-mono flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-brand-400" />
              Expected Deliverables:
            </span>
            <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
              {milestone.deliverables.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-900 border border-surface-700/60 space-y-2">
            <span className="text-xs font-bold text-slate-200 uppercase font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Testing Checklist:
            </span>
            <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
              {milestone.testingChecklist.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};
