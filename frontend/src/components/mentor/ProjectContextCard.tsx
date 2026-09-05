import React from 'react';
import { MentorContext } from '../../types/mentor';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Layers, Bot, Map } from 'lucide-react';

export interface ProjectContextCardProps {
  context: MentorContext;
}

export const ProjectContextCard: React.FC<ProjectContextCardProps> = ({ context }) => {
  return (
    <Card className="bg-surface-900 border border-brand-500/30">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-mono font-bold text-slate-100 uppercase">
              AI MENTOR CONTEXT PINNED
            </h4>
          </div>
          <Badge variant="cyan" size="sm" className="font-mono">
            {context.overallFitScore ?? 85}/100 FIT
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-surface-950/60 border border-surface-700/40">
            <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Project Title:</span>
            <p className="font-semibold text-slate-200 truncate">{context.projectTitle}</p>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-950/60 border border-surface-700/40">
            <span className="text-[10px] font-mono text-slate-400 block mb-0.5 flex items-center gap-1">
              <Map className="w-3 h-3 text-brand-400" /> Architecture Pattern:
            </span>
            <p className="font-semibold text-slate-200 truncate">{context.architecturePattern || 'Client-Server RAG'}</p>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-950/60 border border-surface-700/40">
            <span className="text-[10px] font-mono text-slate-400 block mb-0.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-400" /> Stack Context:
            </span>
            <p className="font-semibold text-slate-200 truncate">{context.techStackSummary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
