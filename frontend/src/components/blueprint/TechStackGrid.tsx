import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Layout, Server, Cpu, Database, Cloud } from 'lucide-react';

export interface TechStackGridProps {
  techStack: {
    frontend: string[];
    backend: string[];
    aiMl: string[];
    database: string[];
    infrastructure: string[];
  };
}

export const TechStackGrid: React.FC<TechStackGridProps> = ({ techStack }) => {
  const categories = [
    { title: 'Frontend Workspace', items: techStack.frontend, icon: Layout, color: 'text-cyan-400' },
    { title: 'Backend Services', items: techStack.backend, icon: Server, color: 'text-brand-400' },
    { title: 'AI & Vector Pipeline', items: techStack.aiMl, icon: Cpu, color: 'text-amber-400' },
    { title: 'Database & Storage', items: techStack.database, icon: Database, color: 'text-emerald-400' },
    { title: 'Cloud & Infrastructure', items: techStack.infrastructure, icon: Cloud, color: 'text-violet-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <Card key={cat.title} className="bg-surface-900/90">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${cat.color}`} />
                <h4 className="text-xs font-bold text-slate-200 tracking-wide uppercase font-mono">
                  {cat.title}
                </h4>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-md bg-surface-950 text-slate-200 border border-surface-700/60 font-mono"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
