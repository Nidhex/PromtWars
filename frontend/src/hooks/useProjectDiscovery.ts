import { useState } from 'react';
import { ProjectDiscoveryInput, ProjectDomain } from '../types/project';
import { projectDiscoveryService } from '../services/projectDiscoveryService';

export function useProjectDiscovery() {
  const [input, setInput] = useState<ProjectDiscoveryInput>({
    domains: ['Artificial Intelligence', 'Healthcare & MedTech'],
    heroPromptText: '',
    intentText: '',
    experienceLevel: 'intermediate',
    durationMonths: 3,
    teamSize: 2,
    difficulty: 'Moderate',
    resources: ['Laptop only', 'Cloud available'],
    preferredTech: ['React', 'Python', 'FastAPI'],
    avoidedTech: [],
    resumeFileName: undefined,
  });

  const [generating, setGenerating] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [progressStageText, setProgressStageText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const toggleDomain = (domain: ProjectDomain) => {
    setInput((prev) => {
      const exists = prev.domains.includes(domain);
      const next = exists ? prev.domains.filter((d) => d !== domain) : [...prev.domains, domain];
      return { ...prev, domains: next };
    });
  };

  const updateInput = (updates: Partial<ProjectDiscoveryInput>) => {
    setInput((prev) => ({ ...prev, ...updates }));
  };

  const toggleResource = (res: string) => {
    setInput((prev) => {
      const exists = prev.resources.includes(res);
      const next = exists ? prev.resources.filter((r) => r !== res) : [...prev.resources, res];
      return { ...prev, resources: next };
    });
  };

  const togglePreferredTech = (tech: string) => {
    setInput((prev) => {
      const exists = prev.preferredTech.includes(tech);
      const next = exists ? prev.preferredTech.filter((t) => t !== tech) : [...prev.preferredTech, tech];
      return { ...prev, preferredTech: next };
    });
  };

  const generateProjects = async (onComplete?: () => void) => {
    setGenerating(true);
    setError(null);
    try {
      const res = await projectDiscoveryService.generateProjectIdeas(input, (stage, percent) => {
        setProgressStageText(stage);
        setProgressPercent(percent);
      });

      if (res.success) {
        onComplete?.();
      } else {
        setError(res.error || 'Generation failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error generating projects');
    } finally {
      setGenerating(false);
    }
  };

  return {
    input,
    updateInput,
    toggleDomain,
    toggleResource,
    togglePreferredTech,
    generating,
    progressPercent,
    progressStageText,
    error,
    generateProjects,
  };
}
