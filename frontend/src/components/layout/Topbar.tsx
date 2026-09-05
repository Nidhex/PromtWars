import React from 'react';
import { Menu, Mic, Sparkles, FolderSync, Command } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { Button } from '../ui/Button';

export interface TopbarProps {
  onMobileMenuToggle: () => void;
  onVoiceClick: () => void;
  activeProjectTitle?: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  onMobileMenuToggle,
  onVoiceClick,
  activeProjectTitle,
}) => {
  return (
    <header className="h-14 bg-surface-900/80 border-b border-surface-700/50 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Menu + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          aria-label="Toggle mobile menu"
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-surface-800 focus-ring"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Breadcrumbs />
      </div>

      {/* Right: Actions & Active Project Selector */}
      <div className="flex items-center gap-3">
        {/* Active Project Sync Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-surface-950/80 border border-surface-700/60 rounded-full text-xs text-slate-300">
          <FolderSync className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span className="text-slate-400 font-mono text-[11px]">Pinned:</span>
          <span className="font-semibold text-slate-200 max-w-[180px] truncate">
            {activeProjectTitle || 'MedTrial AI'}
          </span>
        </div>

        {/* Voice Input Trigger Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onVoiceClick}
          leftIcon={<Mic className="w-3.5 h-3.5 text-brand-400" />}
          className="hidden sm:flex text-xs border-brand-500/30 hover:border-brand-500/60"
        >
          <span>Voice Intake</span>
        </Button>

        {/* AI Quick Shortcut */}
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-surface-950/60 px-2 py-1 border border-surface-700/40 rounded-md">
          <Command className="w-3 h-3 text-slate-400" />
          <span>K</span>
        </div>

        {/* AI Ready Status Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[11px] font-mono text-emerald-400">
          <Sparkles className="w-3 h-3" />
          <span className="hidden xs:inline">Gemini Workspace Ready</span>
        </div>
      </div>
    </header>
  );
};
