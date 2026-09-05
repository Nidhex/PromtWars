import React from 'react';
import { ProjectFilterState, ProjectDomain } from '../../types/project';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ProjectFiltersProps {
  filters: Partial<ProjectFilterState>;
  onFilterChange: (filters: Partial<ProjectFilterState>) => void;
  onReset: () => void;
}

const domains: ProjectDomain[] = [
  'Healthcare & MedTech',
  'DevTools & AI Agents',
  'Sustainability & IoT',
  'Accessibility & Assistive Tech',
];

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="p-4 rounded-xl bg-surface-900 border border-surface-700/60 space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            placeholder="Search projects by domain, tech stack (e.g. FastAPI, RAG, PyTorch)..."
            value={filters.searchQuery || ''}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* Sort Select */}
        <div className="w-full sm:w-48">
          <Select
            value={filters.sortBy || 'fit'}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            options={[
              { value: 'fit', label: 'Sort: Skill Match' },
              { value: 'feasibility', label: 'Sort: Feasibility' },
              { value: 'innovation', label: 'Sort: Innovation' },
              { value: 'weeks', label: 'Sort: Shortest Duration' },
            ]}
          />
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={onReset}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          className="shrink-0 text-xs"
        >
          Reset
        </Button>
      </div>

      {/* Domain Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-surface-700/40">
        <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
          <Filter className="w-3 h-3 text-cyan-400" />
          <span>Domains:</span>
        </span>
        {domains.map((domain) => {
          const isSelected = filters.selectedDomains?.includes(domain);
          return (
            <button
              key={domain}
              onClick={() => {
                const current = filters.selectedDomains || [];
                const next = isSelected ? current.filter((d) => d !== domain) : [...current, domain];
                onFilterChange({ selectedDomains: next });
              }}
              className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                isSelected
                  ? 'bg-brand-500/20 text-brand-300 border-brand-500/40 font-semibold'
                  : 'bg-surface-950/60 hover:bg-surface-800 text-slate-400 border-surface-700/60'
              }`}
            >
              {domain}
            </button>
          );
        })}
      </div>
    </div>
  );
};
