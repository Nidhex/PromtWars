import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Compass,
  FileCode2,
  Map,
  Bot,
  X,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../utils/cn';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/profile', icon: User },
    { label: 'Discover Ideas', path: '/discover', icon: Compass },
    { label: 'Blueprint', path: '/blueprint', icon: FileCode2 },
    { label: 'Roadmap', path: '/roadmap', icon: Map },
    { label: 'AI Mentor', path: '/mentor', icon: Bot },
  ];

  const bottomItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Discover', path: '/discover', icon: Compass },
    { label: 'Blueprint', path: '/blueprint', icon: FileCode2 },
    { label: 'Roadmap', path: '/roadmap', icon: Map },
    { label: 'Mentor', path: '/mentor', icon: Bot },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden animate-in fade-in"
          onClick={onClose}
        />
      )}

      {/* Mobile Slide-Over Drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-surface-950 border-r border-surface-700/60 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-surface-700/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-white">AI Project Mentor</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white focus-ring"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-surface-800'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-surface-700/50 text-xs text-slate-400 font-mono">
          <p>AI Engineering Workspace v1.0</p>
        </div>
      </aside>

      {/* Bottom Sticky Mobile Navigation Bar */}
      <nav
        aria-label="Mobile Navigation Bar"
        className="fixed bottom-0 left-0 right-0 z-30 bg-surface-950/95 border-t border-surface-700/60 backdrop-blur-lg md:hidden flex items-center justify-around py-2 px-1"
      >
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 px-2 py-1 text-[10px] font-medium transition-colors rounded-lg focus-ring select-none',
                isActive ? 'text-brand-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'text-brand-400')} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};
