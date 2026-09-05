import React, { useState } from 'react';
import { MentorMessage as MentorMessageType } from '../../types/mentor';
import { Bot, User, Check, Copy } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MentorMessageProps {
  message: MentorMessageType;
}

export const MentorMessage: React.FC<MentorMessageProps> = ({ message }) => {
  const isStudent = message.sender === 'student';

  return (
    <div
      className={cn(
        'flex gap-3 sm:gap-4 p-4 rounded-2xl transition-all animate-in fade-in',
        isStudent
          ? 'bg-surface-900/90 border border-surface-700/60 ml-6 sm:ml-12'
          : 'bg-surface-900 border border-brand-500/20 mr-4 sm:mr-10 shadow-lg'
      )}
    >
      {/* Sender Avatar */}
      <div
        className={cn(
          'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md font-bold text-xs',
          isStudent
            ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
            : 'bg-brand-600/20 border border-brand-500/40 text-brand-300'
        )}
      >
        {isStudent ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message Content & Timestamp */}
      <div className="flex-1 space-y-2 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold font-mono text-slate-200">
            {isStudent ? 'You (Student)' : 'AI Project Mentor'}
          </span>
          <span className="text-[10px] font-mono text-slate-500">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <FormattedMarkdown content={message.content} />
      </div>
    </div>
  );
};

interface FormattedMarkdownProps {
  content: string;
}

export const FormattedMarkdown: React.FC<FormattedMarkdownProps> = ({ content }) => {
  // Parse message into code blocks vs text blocks
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="text-xs sm:text-sm text-slate-200 space-y-3 leading-relaxed break-words">
      {blocks.map((block, idx) => {
        if (block.type === 'code') {
          return <CodeBlock key={idx} code={block.code || ''} language={block.language} />;
        }
        return <p key={idx} className="whitespace-pre-wrap">{formatInlineText(block.text || '')}</p>;
      })}
    </div>
  );
};

interface MarkdownBlock {
  type: 'text' | 'code';
  text?: string;
  code?: string;
  language?: string;
}

function parseMarkdownBlocks(content: string): MarkdownBlock[] {
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  const blocks: MarkdownBlock[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const text = content.substring(lastIndex, match.index);
      if (text.trim()) {
        blocks.push({ type: 'text', text });
      }
    }

    blocks.push({
      type: 'code',
      language: match[1] || 'plaintext',
      code: match[2].trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    const text = content.substring(lastIndex);
    if (text.trim()) {
      blocks.push({ type: 'text', text });
    }
  }

  return blocks.length > 0 ? blocks : [{ type: 'text', text: content }];
}

function formatInlineText(text: string): React.ReactNode[] {
  // Convert markdown bold (**text**), inline code (`code`), and list items
  const lines = text.split('\n');

  return lines.map((line, lIdx) => {
    let lineContent: React.ReactNode = line;

    // Bullet item
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const bulletText = line.trim().substring(2);
      lineContent = (
        <span className="flex items-start gap-2 pl-2 my-1">
          <span className="text-cyan-400 font-bold">•</span>
          <span>{renderInlineFormatting(bulletText)}</span>
        </span>
      );
    } else if (/^\d+\.\s/.test(line.trim())) {
      lineContent = (
        <span className="flex items-start gap-2 pl-2 my-1">
          <span className="text-brand-400 font-bold font-mono">{line.trim().match(/^\d+\./)?.[0]}</span>
          <span>{renderInlineFormatting(line.trim().replace(/^\d+\.\s/, ''))}</span>
        </span>
      );
    } else if (line.trim().startsWith('### ')) {
      lineContent = (
        <h4 className="text-sm font-bold text-white mt-3 mb-1 border-b border-surface-700/40 pb-1">
          {renderInlineFormatting(line.trim().substring(4))}
        </h4>
      );
    } else {
      lineContent = renderInlineFormatting(line);
    }

    return (
      <React.Fragment key={lIdx}>
        {lineContent}
        {lIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

function renderInlineFormatting(str: string): React.ReactNode[] {
  // Simple bold and inline code parser
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIdx) {
      parts.push(str.substring(lastIdx, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 rounded bg-surface-950 border border-surface-700 text-cyan-300 font-mono text-[11px]">
          {token.slice(1, -1)}
        </code>
      );
    }

    lastIdx = match.index + token.length;
  }

  if (lastIdx < str.length) {
    parts.push(str.substring(lastIdx));
  }

  return parts;
}

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-surface-950 border border-surface-700/80 my-3 font-mono text-xs shadow-inner">
      <div className="px-3.5 py-2 bg-surface-900 border-b border-surface-700/60 flex items-center justify-between text-slate-400">
        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] hover:text-white px-2 py-0.5 rounded bg-surface-950 border border-surface-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed font-mono selection:bg-brand-500 selection:text-white">
        <code>{code}</code>
      </pre>
    </div>
  );
};
