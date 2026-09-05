import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  label?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label = 'Loading AI Workspace Data...',
}) => {
  return (
    <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
      <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
      <p className="text-xs font-mono text-slate-400">{label}</p>
    </div>
  );
};
