import React from 'react';
import { ProjectScores } from '../../types/project';
import { ProgressBar } from '../ui/ProgressBar';

export interface ScoreBreakdownProps {
  scores: ProjectScores;
  className?: string;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ scores, className }) => {
  const items = [
    { label: 'Skill Match', value: scores.skillMatch, variant: 'brand' as const },
    { label: 'Interest Match', value: scores.interestMatch, variant: 'cyan' as const },
    { label: 'Feasibility Score', value: scores.feasibility, variant: 'emerald' as const },
    { label: 'Innovation Index', value: scores.innovation, variant: 'amber' as const },
    { label: 'Technical Depth', value: scores.technicalDepth, variant: 'brand' as const },
  ];

  return (
    <div className={`space-y-3 ${className || ''}`}>
      {items.map((item) => (
        <ProgressBar
          key={item.label}
          label={item.label}
          value={item.value}
          showValueLabel
          variant={item.variant}
          size="md"
        />
      ))}
    </div>
  );
};
