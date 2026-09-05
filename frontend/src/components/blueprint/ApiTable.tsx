import React, { useState } from 'react';
import { ApiEndpoint } from '../../types/blueprint';
import { Badge } from '../ui/Badge';
import { Lock, Unlock, ChevronDown, ChevronUp } from 'lucide-react';

export interface ApiTableProps {
  endpoints: ApiEndpoint[];
}

export const ApiTable: React.FC<ApiTableProps> = ({ endpoints }) => {
  const [expandedId, setExpandedId] = useState<string | null>(endpoints[0]?.id || null);

  const getMethodBadgeVariant = (method: ApiEndpoint['method']) => {
    switch (method) {
      case 'GET':
        return 'cyan';
      case 'POST':
        return 'emerald';
      case 'PUT':
      case 'PATCH':
        return 'amber';
      case 'DELETE':
        return 'rose';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-3">
      {endpoints.map((ep) => {
        const isExpanded = ep.id === expandedId;
        return (
          <div
            key={ep.id}
            className="rounded-xl bg-surface-900 border border-surface-700/60 overflow-hidden transition-colors"
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : ep.id)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-800/40 transition-colors focus-ring"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Badge variant={getMethodBadgeVariant(ep.method)} size="md" className="font-mono font-bold shrink-0">
                  {ep.method}
                </Badge>
                <code className="text-xs font-mono font-semibold text-slate-100 truncate">
                  {ep.path}
                </code>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  {ep.authRequired ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Lock className="w-3 h-3" /> Auth
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-400">
                      <Unlock className="w-3 h-3" /> Public
                    </span>
                  )}
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {isExpanded && (
              <div className="p-4 bg-surface-950/60 border-t border-surface-700/40 space-y-3 text-xs">
                <p className="text-slate-300">{ep.description}</p>

                {ep.requestBodySample && (
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono font-semibold text-slate-400">Sample Request Payload:</span>
                    <pre className="p-3 rounded-lg bg-surface-950 border border-surface-700/50 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                      {ep.requestBodySample}
                    </pre>
                  </div>
                )}

                {ep.responseBodySample && (
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono font-semibold text-slate-400">Sample Response Payload:</span>
                    <pre className="p-3 rounded-lg bg-surface-950 border border-surface-700/50 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                      {ep.responseBodySample}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
