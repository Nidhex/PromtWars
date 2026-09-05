import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

export interface IdeaGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (context: { customInterest?: string; targetDomain?: string }) => Promise<void>;
}

export const IdeaGeneratorModal: React.FC<IdeaGeneratorModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
}) => {
  const [customInterest, setCustomInterest] = useState('');
  const [generating, setGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Analyzing student profile & resume skills...',
    'Understanding hardware constraints & timeline...',
    'Searching Clinical, DevTools & IoT project domains...',
    'Evaluating feasibility & hallucination risks...',
    'Generating audit-ready project specifications...',
  ];

  const handleStartGeneration = async () => {
    setGenerating(true);
    setCurrentStep(0);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 400));
    }

    await onGenerate({ customInterest });
    setGenerating(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Personalized Project Generator"
      description="Leverage Gemini reasoning to synthesize tailored final-year engineering projects."
      maxWidth="md"
    >
      <div className="space-y-5">
        <Input
          label="Optional Specific Domain or Topic Focus"
          placeholder="e.g. Healthcare RAG, AST DevTools, Microgrid Solar IoT..."
          value={customInterest}
          onChange={(e) => setCustomInterest(e.target.value)}
          disabled={generating}
        />

        {generating && (
          <div className="p-4 rounded-xl bg-surface-950/80 border border-brand-500/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-300">
              <Loader2 className="w-4 h-4 text-brand-400 animate-spin" />
              <span>AI Workspace Synthesis in Progress</span>
            </div>

            <div className="space-y-2 pt-1">
              {steps.map((stepText, idx) => {
                const isDone = idx < currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div
                    key={stepText}
                    className={`flex items-center gap-2 text-xs transition-opacity duration-200 ${
                      isDone
                        ? 'text-emerald-400 font-medium'
                        : isCurrent
                        ? 'text-slate-100 font-semibold animate-pulse'
                        : 'text-slate-500 opacity-40'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-current shrink-0 flex items-center justify-center text-[9px]">
                        {idx + 1}
                      </span>
                    )}
                    <span>{stepText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-700/40">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={generating}>
            Cancel
          </Button>
          <Button
            variant="gradient"
            size="md"
            onClick={handleStartGeneration}
            isLoading={generating}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Synthesize Ideas
          </Button>
        </div>
      </div>
    </Modal>
  );
};
