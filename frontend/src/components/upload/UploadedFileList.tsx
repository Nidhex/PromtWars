import React from 'react';
import { UploadedDocument } from '../../types/student';
import { formatFileSize } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { FileText, Trash2, CheckCircle2, Sparkles } from 'lucide-react';

export interface UploadedFileListProps {
  documents: UploadedDocument[];
  onDelete?: (documentId: string) => void;
}

export const UploadedFileList: React.FC<UploadedFileListProps> = ({ documents, onDelete }) => {
  if (documents.length === 0) {
    return (
      <div className="p-4 rounded-xl border border-surface-700/40 bg-surface-950/40 text-center text-xs text-slate-400">
        No documents uploaded yet. Upload your resume or CV to enhance AI project recommendations.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="p-4 rounded-xl bg-surface-900 border border-surface-700/60 hover:border-slate-600 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center text-brand-400 shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-semibold text-slate-100 truncate">{doc.fileName}</h4>
                <Badge variant="emerald" size="sm" className="gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>{doc.status}</span>
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                {formatFileSize(doc.fileSize)} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
              </p>
              {doc.extractedSummary && (
                <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 bg-surface-950/40 p-2 rounded border border-surface-700/30">
                  <Sparkles className="w-3 h-3 text-cyan-400 inline mr-1" />
                  {doc.extractedSummary}
                </p>
              )}
            </div>
          </div>

          {onDelete && (
            <button
              onClick={() => onDelete(doc.id)}
              aria-label={`Delete document ${doc.fileName}`}
              className="self-end sm:self-center p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors focus-ring"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
