import { useState, useEffect, useCallback } from 'react';
import { ProjectIdea } from '../types/project';
import { projectService } from '../services/projectService';

export function useProjectDetails(projectId?: string) {
  const [project, setProject] = useState<ProjectIdea | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [improving, setImproving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    if (!projectId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await projectService.getProjectById(projectId);
      if (res.success && res.data) {
        setProject(res.data);
      } else {
        setError(res.error || 'Project not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch project details');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const improveIdea = async (instructions: string) => {
    if (!projectId) return;
    setImproving(true);
    try {
      const res = await projectService.improveIdea(projectId, instructions);
      if (res.success && res.data) {
        setProject(res.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to improve idea');
    } finally {
      setImproving(false);
    }
  };

  return {
    project,
    loading,
    improving,
    error,
    refreshProject: fetchProject,
    improveIdea,
  };
}
