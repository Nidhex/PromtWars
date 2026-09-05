import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeNameMap: Record<string, string> = {
  dashboard: 'Dashboard',
  profile: 'Student Profile',
  discover: 'Discover Projects',
  blueprint: 'Engineering Blueprint',
  roadmap: 'Interactive Roadmap',
  mentor: 'AI Mentor',
  settings: 'Settings',
  projects: 'Projects',
};

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return (
      <div className="flex items-center text-xs text-slate-400">
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Landing Workspace</span>
      </div>
    );
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-slate-400">
      <NavLink
        to="/dashboard"
        className="hover:text-slate-200 transition-colors flex items-center gap-1 focus-ring rounded"
      >
        <Home className="w-3.5 h-3.5 text-slate-400" />
      </NavLink>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = routeNameMap[value] || (value.startsWith('proj_') ? 'Project Details' : value);

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-slate-200 truncate max-w-[150px] sm:max-w-xs">
                {displayName}
              </span>
            ) : (
              <NavLink to={to} className="hover:text-slate-200 transition-colors truncate focus-ring rounded">
                {displayName}
              </NavLink>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
