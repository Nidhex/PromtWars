import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ResumeUploaderProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  selectedFile,
  onFileSelect,
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (file: File) => {
    setValidationError(null);
    const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    const isValidExt = ['.pdf', '.docx', '.doc'].includes(ext);

    if (!isValidExt) {
      setValidationError('Invalid file extension. Only PDF (.pdf) and Word (.docx) files are supported.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setValidationError('File size exceeds the 5MB maximum upload limit.');
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider block">
        Upload Engineering Resume (PDF / DOCX)
      </label>

      {selectedFile ? (
        <div className="p-4 rounded-2xl bg-surface-900 border border-emerald-500/40 flex items-center justify-between gap-4 shadow-lg animate-in fade-in">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-white truncate">{selectedFile.name}</p>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>
              <p className="text-xs font-mono text-slate-400">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for ATS Analysis
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={disabled}
            onClick={() => onFileSelect(null)}
            aria-label="Remove File"
            className="p-1.5 rounded-lg bg-surface-950 border border-surface-700 text-slate-400 hover:text-white transition-colors focus-ring disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={cn(
            'p-8 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all duration-200 space-y-3 select-none focus-ring',
            isDragging
              ? 'border-brand-400 bg-brand-500/10 scale-[1.01]'
              : 'border-surface-700 hover:border-slate-500 bg-surface-900/60 hover:bg-surface-900',
            disabled && 'opacity-50 cursor-not-allowed border-surface-800'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            disabled={disabled}
            className="hidden"
          />

          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mx-auto text-brand-400">
            <Upload className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-100">
              Drag & drop your resume file here, or{' '}
              <span className="text-cyan-400 hover:underline">browse files</span>
            </p>
            <p className="text-xs text-slate-400">Supports PDF and DOCX files up to 5MB</p>
          </div>
        </div>
      )}

      {validationError && (
        <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 flex items-center gap-2 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}
    </div>
  );
};
