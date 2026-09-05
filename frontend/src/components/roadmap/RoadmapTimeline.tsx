import React, { useState } from 'react';
import { Roadmap, Milestone } from '../../types/roadmap';
import { MilestoneCard } from './MilestoneCard';
import { MilestoneModal } from './MilestoneModal';
import { ProgressBar } from '../ui/ProgressBar';

export interface RoadmapTimelineProps {
  roadmap: Roadmap;
  onToggleTask: (milestoneId: string, taskId: string) => void;
  onUpdateMilestoneStatus: (milestoneId: string, status: any) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  roadmap,
  onToggleTask,
  onUpdateMilestoneStatus,
}) => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  return (
    <div className="space-y-8">
      {/* Overall Progress Banner */}
      <div className="p-6 rounded-2xl bg-surface-900 border border-surface-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-brand-400 font-bold">PROJECT TIMELINE:</span>
            <span className="text-xs font-mono text-slate-300 font-semibold">{roadmap.totalWeeks} WEEKS TOTAL</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">{roadmap.projectTitle}</h2>
        </div>

        <div className="w-full md:w-72 bg-surface-950/80 p-3.5 rounded-xl border border-surface-700/40">
          <ProgressBar
            value={roadmap.overallProgressPercentage}
            showValueLabel
            label="Overall Implementation Progress"
            variant="emerald"
            size="md"
          />
        </div>
      </div>

      {/* Phases Timeline */}
      <div className="space-y-8 relative">
        {roadmap.phases.map((phase) => (
          <div key={phase.id} className="space-y-4">
            {/* Phase Header */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-300 border border-brand-500/40 flex items-center justify-center text-xs font-mono font-bold">
                0{phase.phaseNumber}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">{phase.name}</h3>
                <p className="text-xs text-slate-400">{phase.description}</p>
              </div>
            </div>

            {/* Milestones Grid in Phase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 sm:pl-11 border-l-2 border-surface-700/40">
              {phase.milestones.map((milestone) => (
                <MilestoneCard
                  key={milestone.id}
                  milestone={milestone}
                  onToggleTask={(taskId) => onToggleTask(milestone.id, taskId)}
                  onSelectMilestone={setSelectedMilestone}
                  isActive={milestone.id === roadmap.currentMilestoneId}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Milestone Interactive Modal */}
      <MilestoneModal
        isOpen={Boolean(selectedMilestone)}
        onClose={() => setSelectedMilestone(null)}
        milestone={selectedMilestone}
        onToggleTask={onToggleTask}
        onUpdateStatus={onUpdateMilestoneStatus}
      />
    </div>
  );
};
