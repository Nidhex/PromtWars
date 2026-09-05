import React from 'react';
import { AiPipelineStep } from '../../types/blueprint';
import { Cpu, ArrowDown, Clock } from 'lucide-react';

export interface AiPipelineViewerProps {
  steps: AiPipelineStep[];
}

export const AiPipelineViewer: React.FC<AiPipelineViewerProps> = ({ steps }) => {
  return (
    <div className="space-y-4">
      {steps.map((step, idx) => (
        <React.Fragment key={step.stepNumber}>
          <div className="p-4 rounded-xl bg-surface-900 border border-surface-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/40 text-xs font-mono font-bold flex items-center justify-center">
                  {step.stepNumber}
                </span>
                <h4 className="text-sm font-semibold text-slate-100">{step.name}</h4>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{step.latencyExpectation}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-surface-950/60 border border-surface-700/40">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Input Data:</span>
                <p className="text-slate-200 font-medium">{step.input}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-950/60 border border-brand-500/30">
                <span className="text-[10px] font-mono text-brand-300 uppercase block mb-1 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-brand-400" />
                  Model / Technique:
                </span>
                <p className="text-slate-100 font-semibold">{step.modelOrTechnique}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-950/60 border border-emerald-500/30">
                <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">Output Artifact:</span>
                <p className="text-slate-200 font-medium">{step.output}</p>
              </div>
            </div>
          </div>

          {idx < steps.length - 1 && (
            <div className="flex justify-center my-1">
              <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
