import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Sparkles, Database, Cloud, Key } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <AppShell activeProjectTitle="MedTrial AI Screener">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-surface-900 border border-surface-700/60 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Workspace & Service Settings</h1>
            <p className="text-xs text-slate-400 mt-1">
              Configuration, service boundaries, and integration readiness for Firebase & Google Gemini API.
            </p>
          </div>
          <Badge variant="cyan" size="md">
            Environment: Ready
          </Badge>
        </div>

        {/* Integration Readiness Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Future Integration Readiness Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-surface-950/60 border border-surface-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">Google Gemini API Gateway Boundary</h4>
                  <p className="text-slate-400 text-[11px]">
                    Client-side decoupled service boundaries ready for server-side proxy execution. Zero secrets exposed.
                  </p>
                </div>
              </div>
              <Badge variant="emerald" size="sm">
                Clean Boundary
              </Badge>
            </div>

            <div className="p-4 rounded-xl bg-surface-950/60 border border-surface-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/30">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">Firebase Auth & Storage Infrastructure</h4>
                  <p className="text-slate-400 text-[11px]">
                    Document intake hooks configured to stream upload blobs to Firebase Storage buckets.
                  </p>
                </div>
              </div>
              <Badge variant="brand" size="sm">
                Ready for Binding
              </Badge>
            </div>

            <div className="p-4 rounded-xl bg-surface-950/60 border border-surface-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">Google Cloud Run Service Proxy</h4>
                  <p className="text-slate-400 text-[11px]">
                    `VITE_API_BASE_URL` environment configuration variable set to target backend REST endpoints.
                  </p>
                </div>
              </div>
              <Badge variant="cyan" size="sm">
                Configured
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Data Reset */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase">Local Workspace Storage</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-slate-200">Prototype Demo State</p>
              <p className="text-slate-400 text-[11px]">Reset in-memory student profile and project state.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Reload Demo State
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};
