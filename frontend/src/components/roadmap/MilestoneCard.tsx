import React from 'react';
import { Milestone, MilestoneStatus } from '../../types/roadmap';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Clock, CheckCircle2, Circle, AlertTriangle, Layers, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface MilestoneCardProps {
  milestone: Milestone;
  onToggleTask: (taskId: string) => void;
  onSelectMilestone: (milestone: Milestone) => void;
  isActive?: boolean;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  onToggleTask,
  onSelectMilestone,
  isActive = false,
}) => {
  const completedCount = milestone.tasks.filter((t) => t.completed).length;
  const totalCount = milestone.tasks.length;
  const progressPercent = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="emerald" size="sm" className="gap-1">
            <CheckCircle2 className="w-3 h-3" /> Completed
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="cyan" size="sm" className="gap-1 animate-pulse">
            <Circle className="w-3 h-3 text-cyan-400 fill-cyan-400" /> In Progress
          </Badge>
        );
      case 'blocked':
        return (
          <Badge variant="rose" size="sm" className="gap-1">
            <AlertTriangle className="w-3 h-3" /> Blocked
          </Badge>
        );
      default:
        return (
          <Badge variant="default" size="sm">
            Not Started
          </Badge>
        );
    }
  };

  return (
    <Card
      variant="interactive"
      onClick={() => onSelectMilestone(milestone)}
      className={cn(
        'transition-all duration-200',
        isActive ? 'border-brand-500 bg-surface-800/90 shadow-xl shadow-brand-500/10' : ''
      )}
    >
      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-slate-400 font-bold">
                MILESTONE 0{milestone.order}
              </span>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{milestone.durationWeeks} Wks</span>
              </div>
            </div>
            <h3 className="text-base font-bold text-slate-100">{milestone.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{milestone.tagline}</p>
          </div>

          <div className="shrink-0">{getStatusBadge(milestone.status)}</div>
        </div>

        {/* Task Progress Bar */}
        <div className="p-3 rounded-lg bg-surface-950/60 border border-surface-700/40 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Tasks Checklist:</span>
            <span className="font-mono font-semibold text-slate-200">
              {completedCount} / {totalCount} ({Math.round(progressPercent)}%)
            </span>
          </div>
          <ProgressBar value={progressPercent} variant={milestone.status === 'completed' ? 'emerald' : 'cyan'} size="sm" />
        </div>

        {/* Quick Task List Preview (Max 3) */}
        <div className="space-y-1.5 pt-1">
          {milestone.tasks.slice(0, 3).map((task) => (
            <label
              key={task.id}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between p-2 rounded-md bg-surface-900/60 hover:bg-surface-800/80 transition-colors cursor-pointer text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className="rounded border-slate-700 text-brand-500 focus:ring-brand-500 focus:ring-offset-background bg-surface-950"
                />
                <span className={cn('truncate text-slate-200', task.completed && 'line-through text-slate-500')}>
                  {task.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">{task.estimatedHours}h</span>
            </label>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-surface-700/40 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>{milestone.technologies.slice(0, 2).join(', ')}</span>
          </div>
          <span className="text-brand-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            View Details <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
