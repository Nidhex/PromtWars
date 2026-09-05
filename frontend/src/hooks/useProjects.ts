import { useState, useEffect, useCallback } from 'react';
import { ProjectIdea, ProjectFilterState } from '../types/project';
import { projectService } from '../services/projectService';

export function useProjects(initialFilters?: Partial<ProjectFilterState>) {
  const [projects, setProjects] = useState<ProjectIdea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [generating, setGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Partial<ProjectFilterState>>(initialFilters || {});
  const [comparedProjectIds, setComparedProjectIds] = useState<string[]>([]);

  const fetchProjects = useCallback(async (customFilters?: Partial<ProjectFilterState>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await projectService.getProjects(customFilters ?? filters);
      if (res.success && res.data) {
        setProjects(res.data);
      } else {
        setError(res.error || 'Failed to fetch project ideas');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const updateFilters = (newFilters: Partial<ProjectFilterState>) => {
    setFilters((prev) => {
      const merged = { ...prev, ...newFilters };
      fetchProjects(merged);
      return merged;
    });
  };

  const resetFilters = () => {
    const empty: Partial<ProjectFilterState> = {
      searchQuery: '',
      selectedDomains: [],
      selectedDifficulties: [],
      minOverallScore: 0,
      sortBy: 'fit',
    };
    setFilters(empty);
    fetchProjects(empty);
  };

  const generateAIIdeas = async (promptContext?: { customInterest?: string; targetDomain?: string }) => {
    setGenerating(true);
    setError(null);
    try {
      const res = await projectService.generatePersonalizedIdeas(promptContext);
      if (res.success && res.data) {
        setProjects(res.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const toggleCompare = (projectId: string) => {
    setComparedProjectIds((prev) => {
      if (prev.includes(projectId)) {
        return prev.filter((id) => id !== projectId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), projectId];
      }
      return [...prev, projectId];
    });
  };

  const clearCompare = () => {
    setComparedProjectIds([]);
  };

  return {
    projects,
    loading,
    generating,
    error,
    filters,
    updateFilters,
    resetFilters,
    refreshProjects: fetchProjects,
    generateAIIdeas,
    comparedProjectIds,
    toggleCompare,
    clearCompare,
  };
}
