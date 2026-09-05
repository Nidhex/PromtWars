import { useState, useEffect, useCallback } from 'react';
import { ProjectBlueprint } from '../types/blueprint';
import { blueprintService } from '../services/blueprintService';

export function useBlueprint(projectId: string = 'proj_medtech_01') {
  const [blueprint, setBlueprint] = useState<ProjectBlueprint | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [regenerating, setRegenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlueprint = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await blueprintService.getBlueprintByProjectId(projectId);
      if (res.success && res.data) {
        setBlueprint(res.data);
      } else {
        setError(res.error || 'Failed to load blueprint');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading blueprint');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchBlueprint();
  }, [fetchBlueprint]);

  const regenerateBlueprint = async () => {
    setRegenerating(true);
    try {
      const res = await blueprintService.generateBlueprint(projectId);
      if (res.success && res.data) {
        setBlueprint(res.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate blueprint');
    } finally {
      setRegenerating(false);
    }
  };

  const getMarkdownExport = () => {
    if (!blueprint) return '';
    return blueprintService.exportBlueprintAsMarkdown(blueprint);
  };

  return {
    blueprint,
    loading,
    regenerating,
    error,
    refreshBlueprint: fetchBlueprint,
    regenerateBlueprint,
    getMarkdownExport,
  };
}
