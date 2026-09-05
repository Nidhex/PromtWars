import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Compass,
  FileCode2,
  Map,
  Bot,
  Settings,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { StudentProfile } from '../../types/student';

export interface SidebarProps {
  profile: StudentProfile | null;
  activeProjectTitle?: string;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ profile, activeProjectTitle, className }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/profile', icon: User },
    { label: 'Discover Projects', path: '/discover', icon: Compass, badge: 'AI Workspace' },
    { label: 'Blueprint', path: '/blueprint', icon: FileCode2 },
    { label: 'Roadmap', path: '/roadmap', icon: Map },
    { label: 'AI Mentor', path: '/mentor', icon: Bot, badge: 'Context-Aware' },
  ];

  // Map route to lifecycle step
  const currentPath = location.pathname;
  let currentStage = 'DISCOVER';
  if (currentPath.includes('/projects') || currentPath.includes('/discover')) currentStage = 'DISCOVER';
  else if (currentPath.includes('/blueprint')) currentStage = 'PLAN';
  else if (currentPath.includes('/roadmap')) currentStage = 'PLAN';
  else if (currentPath.includes('/mentor')) currentStage = 'BUILD';

  const stages = ['DISCOVER', 'EVALUATE', 'PLAN', 'BUILD'];

  return (
    <aside
      className={cn(
        'w-64 bg-surface-950/90 border-r border-surface-700/50 flex flex-col justify-between select-none h-screen sticky top-0',
        className
      )}
    >
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-surface-700/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
              <Sparkles className="w-5 h-5 animate-pulse-subtle" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                AI Project Mentor
              </h1>
              <p className="text-[10px] text-slate-400 font-mono">Engineering Copilot</p>
            </div>
          </div>
        </div>

        {/* Lifecycle Stepper Indicator */}
        <div className="px-4 py-3 bg-surface-900/60 border-b border-surface-700/30">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 flex items-center gap-1">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>Project Lifecycle</span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-[9px] font-mono text-center font-semibold">
            {stages.map((stage) => {
              const isActive = stage === currentStage;
              return (
                <div
                  key={stage}
                  className={cn(
                    'py-1 rounded transition-colors',
                    isActive
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                      : 'text-slate-500 bg-surface-950/40'
                  )}
                >
                  {stage}
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary Navigation Links */}
        <nav className="p-3 space-y-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: linkActive }) =>
                  cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group focus-ring',
                    linkActive || isActive
                      ? 'bg-brand-600/15 text-brand-300 border border-brand-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-surface-800/60'
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      isActive ? 'text-brand-400' : 'text-slate-400 group-hover:text-slate-300'
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                ) : (
                  isActive && <ChevronRight className="w-3.5 h-3.5 text-brand-400" />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Active Project Indicator & Settings */}
      <div className="p-3 border-t border-surface-700/40 space-y-2 bg-surface-950/60">
        {/* Active Project Indicator Card */}
        <div className="p-2.5 rounded-lg bg-surface-900 border border-surface-700/60 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Active Workspace</span>
            <p className="text-xs font-semibold text-slate-200 truncate">
              {activeProjectTitle || 'MedTrial AI: Patient Screener'}
            </p>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Active Context Sync" />
        </div>

        {/* User Info & Settings */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-brand-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {profile?.fullName ? profile.fullName.charAt(0) : 'A'}
            </div>
            <div className="min-w-0 text-left">
              <p className="text-xs font-medium text-slate-200 truncate">
                {profile?.fullName || 'Aarav Sharma'}
              </p>
              <p className="text-[10px] text-slate-400 truncate font-mono">
                {profile?.major || 'Stanford CS'}
              </p>
            </div>
          </div>

          <NavLink
            to="/settings"
            aria-label="Settings"
            className={({ isActive }) =>
              cn(
                'p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-surface-800 transition-colors focus-ring',
                isActive && 'text-brand-400 bg-surface-800'
              )
            }
          >
            <Settings className="w-4 h-4" />
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
