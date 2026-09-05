import React, { useRef } from 'react';
import { useDocumentUpload } from '../../hooks/useDocumentUpload';
import { UploadedDocument } from '../../types/student';
import { Button } from '../ui/Button';
import { UploadCloud, FileText, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface DocumentUploaderProps {
  onDocumentUploaded?: (doc: UploadedDocument) => void;
  className?: string;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onDocumentUploaded,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    uploading,
    error,
    dragActive,
    uploadFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearError,
  } = useDocumentUpload(onDocumentUploaded);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadFile(e.target.files[0]);
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        tabIndex={0}
        role="button"
        aria-label="Upload resume or project abstract PDF document"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={cn(
          'border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all duration-200 cursor-pointer focus-ring select-none flex flex-col items-center justify-center space-y-3',
          dragActive
            ? 'border-brand-500 bg-brand-500/10 scale-[1.01]'
            : 'border-surface-700/80 bg-surface-900/60 hover:border-slate-500 hover:bg-surface-800/60'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
          className="hidden"
          data-testid="file-input"
        />

        <div className="w-12 h-12 rounded-xl bg-surface-800 border border-surface-700 flex items-center justify-center text-brand-400">
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-brand-400" />
          ) : (
            <UploadCloud className="w-6 h-6 text-brand-400" />
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-100">
            {uploading ? 'Processing & Indexing Document...' : 'Drag & drop your Resume or Project PDF'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Supports PDF, DOCX, or TXT (Max 10MB). Client-side metadata parsing.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          disabled={uploading}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
          leftIcon={<FileText className="w-3.5 h-3.5 text-slate-400" />}
        >
          Select File
        </Button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-xs text-rose-400">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={clearError} className="underline hover:text-white text-[11px]">
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
