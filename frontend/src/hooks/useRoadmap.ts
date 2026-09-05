import { useState, useEffect, useCallback } from 'react';
import { Roadmap, MilestoneStatus } from '../types/roadmap';
import { roadmapService } from '../services/roadmapService';

export function useRoadmap(projectId: string = 'proj_medtech_01') {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMilestoneId, setActiveMilestoneId] = useState<string | null>(null);

  const fetchRoadmap = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await roadmapService.getRoadmapByProjectId(projectId);
      if (res.success && res.data) {
        setRoadmap(res.data);
        if (!activeMilestoneId && res.data.currentMilestoneId) {
          setActiveMilestoneId(res.data.currentMilestoneId);
        }
      } else {
        setError(res.error || 'Failed to load roadmap');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading roadmap');
    } finally {
      setLoading(false);
    }
  }, [projectId, activeMilestoneId]);

  useEffect(() => {
    fetchRoadmap();
  }, [fetchRoadmap]);

  const toggleTask = async (milestoneId: string, taskId: string) => {
    try {
      const res = await roadmapService.toggleTaskCompletion(milestoneId, taskId);
      if (res.success && res.data) {
        setRoadmap(res.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const updateMilestoneStatus = async (milestoneId: string, status: MilestoneStatus) => {
    try {
      const res = await roadmapService.updateMilestoneStatus(milestoneId, status);
      if (res.success && res.data) {
        setRoadmap(res.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update milestone status');
    }
  };

  return {
    roadmap,
    loading,
    error,
    activeMilestoneId,
    setActiveMilestoneId,
    refreshRoadmap: fetchRoadmap,
    toggleTask,
    updateMilestoneStatus,
  };
}
