import React from 'react';
import { ProjectIdea } from '../../types/project';
import { ProjectCard } from './ProjectCard';
import { Skeleton } from '../ui/Skeleton';
import { EmptyState } from '../common/EmptyState';
import { Compass } from 'lucide-react';

export interface ProjectGridProps {
  projects: ProjectIdea[];
  loading?: boolean;
  comparedIds?: string[];
  onCompareToggle?: (id: string) => void;
  onSelectProject?: (id: string) => void;
  onResetFilters?: () => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  loading = false,
  comparedIds = [],
  onCompareToggle,
  onSelectProject,
  onResetFilters,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-5 bg-surface-900 border border-surface-700/60 rounded-xl space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex items-center justify-between pt-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        icon={Compass}
        title="No Matching Project Ideas"
        description="Try adjusting your domain filters or search query to explore more personalized final-year project ideas."
        actionLabel="Reset Search Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isCompared={comparedIds.includes(project.id)}
          onCompareToggle={onCompareToggle}
          onSelectProject={onSelectProject}
        />
      ))}
    </div>
  );
};
