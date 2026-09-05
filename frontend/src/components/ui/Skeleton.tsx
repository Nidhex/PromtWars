import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  ...props
}) => {
  const variants = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        'bg-surface-800/80 animate-pulse bg-gradient-to-r from-surface-800 via-surface-700/50 to-surface-800 bg-[length:200%_100%] animate-shimmer',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
