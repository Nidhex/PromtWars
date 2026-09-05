import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useRoadmap } from '../../hooks/useRoadmap';
import { RoadmapTimeline } from '../../components/roadmap/RoadmapTimeline';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';

export const RoadmapPage: React.FC = () => {
  const { roadmap, loading, error, toggleTask, updateMilestoneStatus, refreshRoadmap } =
    useRoadmap('proj_medtech_01');

  if (loading) {
    return (
      <AppShell>
        <LoadingState label="Building Interactive Roadmap Timeline..." />
      </AppShell>
    );
  }

  if (error || !roadmap) {
    return (
      <AppShell>
        <ErrorState message={error || 'Roadmap unavailable'} onRetry={refreshRoadmap} />
      </AppShell>
    );
  }

  return (
    <AppShell activeProjectTitle={roadmap.projectTitle}>
      <RoadmapTimeline
        roadmap={roadmap}
        onToggleTask={toggleTask}
        onUpdateMilestoneStatus={updateMilestoneStatus}
      />
    </AppShell>
  );
};
