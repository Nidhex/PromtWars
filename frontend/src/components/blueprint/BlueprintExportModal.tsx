import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Copy, Check, Download } from 'lucide-react';

export interface BlueprintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  markdownContent: string;
  projectTitle: string;
}

export const BlueprintExportModal: React.FC<BlueprintExportModalProps> = ({
  isOpen,
  onClose,
  markdownContent,
  projectTitle,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle.toLowerCase().replace(/\s+/g, '_')}_blueprint.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Engineering Blueprint"
      description="Download or copy your complete AI project architecture document."
      maxWidth="2xl"
    >
      <div className="space-y-4">
        <Textarea
          value={markdownContent}
          readOnly
          rows={12}
          className="font-mono text-xs text-slate-200 bg-surface-950"
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-700/40">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'Copied to Clipboard!' : 'Copy Markdown'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleDownload}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Download .md File
          </Button>
        </div>
      </div>
    </Modal>
  );
};
