import React, { useState } from 'react';
import { Target, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Textarea } from '../ui/Textarea';

interface JobDescriptionInputProps {
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
  disabled?: boolean;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobDescription,
  onJobDescriptionChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-surface-900 border border-surface-700/60 overflow-hidden">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-4 cursor-pointer hover:bg-surface-800/60 transition-colors flex items-center justify-between gap-3 select-none"
      >
        <div className="flex items-center gap-2.5">
          <Target className="w-4 h-4 text-cyan-400" />
          <div>
            <h4 className="text-xs font-bold text-slate-100">Target Role / Job Description (Optional)</h4>
            <p className="text-[11px] text-slate-400">
              Paste a target job posting to perform role keyword overlap matching.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {jobDescription && (
            <span className="text-[11px] font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
              JD Added
            </span>
          )}
          <button
            type="button"
            className="p-1 rounded-lg bg-surface-950 border border-surface-700 text-slate-300"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 border-t border-surface-700/50 bg-surface-950/60 space-y-3 animate-in fade-in">
          <div className="relative">
            <Textarea
              value={jobDescription}
              onChange={(e) => onJobDescriptionChange(e.target.value)}
              disabled={disabled}
              rows={4}
              placeholder="Paste the target job description here (e.g. Full Stack Engineer, ML Engineer requirements)..."
              className="text-xs sm:text-sm bg-surface-900 border-surface-700 p-3"
            />
            {jobDescription && (
              <button
                type="button"
                onClick={() => onJobDescriptionChange('')}
                className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white text-xs flex items-center gap-1 bg-surface-950 rounded border border-surface-700"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-400 italic">
            💡 The ATS Analyzer will compare your resume keywords against this Job Description without encouraging keyword stuffing.
          </p>
        </div>
      )}
    </div>
  );
};
