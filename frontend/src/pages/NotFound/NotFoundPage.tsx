import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-brand-500/15 border border-brand-500/30 text-brand-400 flex items-center justify-center text-xl font-mono font-bold">
        404
      </div>

      <div className="space-y-1 max-w-sm">
        <h1 className="text-xl font-bold text-slate-100">Page Not Found</h1>
        <p className="text-xs text-slate-400">
          The workspace page you are trying to reach does not exist or has been moved.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button variant="outline" size="sm" onClick={() => navigate('/discover')} leftIcon={<Compass className="w-3.5 h-3.5" />}>
          Discover Projects
        </Button>
        <Button variant="primary" size="sm" onClick={() => navigate('/dashboard')} leftIcon={<Home className="w-3.5 h-3.5" />}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};
