import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useProjects } from '../../hooks/useProjects';
import { ProjectGrid } from '../../components/projects/ProjectGrid';
import { ProjectFilters } from '../../components/projects/ProjectFilters';
import { ProjectCompareModal } from '../../components/projects/ProjectCompareModal';
import { IdeaGeneratorModal } from '../../components/projects/IdeaGeneratorModal';
import { Button } from '../../components/ui/Button';
import { Sparkles, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DiscoverPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    projects,
    loading,
    filters,
    updateFilters,
    resetFilters,
    generateAIIdeas,
    comparedProjectIds,
    toggleCompare,
  } = useProjects();

  const [generatorModalOpen, setGeneratorModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const comparedProjects = projects.filter((p) => comparedProjectIds.includes(p.id));

  return (
    <AppShell activeProjectTitle="MedTrial AI Screener">
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-surface-900 border border-surface-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                AI Project Workspace
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">Discover Engineering Projects</h1>
            <p className="text-xs text-slate-400 mt-1">
              Tailored final-year project concepts evaluated for skill match, feasibility, and technical depth.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {comparedProjectIds.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCompareModalOpen(true)}
                leftIcon={<Layers className="w-3.5 h-3.5 text-cyan-400" />}
              >
                Compare ({comparedProjectIds.length})
              </Button>
            )}

            <Button
              variant="gradient"
              size="md"
              onClick={() => setGeneratorModalOpen(true)}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Synthesize AI Ideas
            </Button>
          </div>
        </div>

        {/* Filters Bar */}
        <ProjectFilters filters={filters} onFilterChange={updateFilters} onReset={resetFilters} />

        {/* Project Cards Grid */}
        <ProjectGrid
          projects={projects}
          loading={loading}
          comparedIds={comparedProjectIds}
          onCompareToggle={toggleCompare}
          onSelectProject={(id) => navigate(`/projects/${id}`)}
          onResetFilters={resetFilters}
        />

        {/* AI Idea Generator Modal */}
        <IdeaGeneratorModal
          isOpen={generatorModalOpen}
          onClose={() => setGeneratorModalOpen(false)}
          onGenerate={generateAIIdeas}
        />

        {/* Compare Projects Modal */}
        <ProjectCompareModal
          isOpen={compareModalOpen}
          onClose={() => setCompareModalOpen(false)}
          projects={comparedProjects}
        />
      </div>
    </AppShell>
  );
};
