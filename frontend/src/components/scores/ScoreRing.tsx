import React from 'react';
import { getScoreColorClass } from '../../utils/formatters';
import { cn } from '../../utils/cn';

export interface ScoreRingProps {
  score: number; // 0 - 100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  label,
  size = 'md',
  className,
}) => {
  const normalizedScore = Math.min(100, Math.max(0, score));

  const dimensions = {
    sm: { size: 48, strokeWidth: 4, fontSize: 'text-xs' },
    md: { size: 72, strokeWidth: 6, fontSize: 'text-base font-bold' },
    lg: { size: 96, strokeWidth: 8, fontSize: 'text-xl font-bold' },
  };

  const { size: svgSize, strokeWidth, fontSize } = dimensions[size];
  const radius = (svgSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const colorStyles = getScoreColorClass(normalizedScore);

  return (
    <div className={cn('inline-flex flex-col items-center justify-center gap-1', className)}>
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="transform -rotate-90"
          aria-label={`${label || 'Score'}: ${normalizedScore} out of 100`}
        >
          {/* Track */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-surface-800"
          />
          {/* Progress */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke={colorStyles.fill}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Numeric Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={cn('font-mono text-slate-100', fontSize)}>
            {Math.round(normalizedScore)}
          </span>
        </div>
      </div>
      {label && <span className="text-[11px] font-medium text-slate-400 text-center">{label}</span>}
    </div>
  );
};
