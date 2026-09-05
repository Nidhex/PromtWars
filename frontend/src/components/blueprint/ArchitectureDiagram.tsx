import React, { useState } from 'react';
import { SystemArchitecture, ArchitectureNode } from '../../types/blueprint';
import { Badge } from '../ui/Badge';
import { Layers, Server, Cpu, Database, Globe, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ArchitectureDiagramProps {
  architecture: SystemArchitecture;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ architecture }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(architecture.nodes[0]?.id || null);

  const getNodeIcon = (category: ArchitectureNode['category']) => {
    switch (category) {
      case 'client':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'api_gateway':
        return <Server className="w-5 h-5 text-brand-400" />;
      case 'ai_engine':
        return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'storage':
        return <Database className="w-5 h-5 text-emerald-400" />;
      default:
        return <Layers className="w-5 h-5 text-slate-400" />;
    }
  };

  const selectedNode = architecture.nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="space-y-4">
      {/* Overview Description */}
      <p className="text-xs text-slate-300 bg-surface-950/40 p-3.5 rounded-xl border border-surface-700/40 leading-relaxed">
        {architecture.overview}
      </p>

      {/* Visual Component Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {architecture.nodes.map((node) => {
          const isSelected = node.id === selectedNodeId;
          return (
            <div
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={cn(
                'p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3',
                isSelected
                  ? 'bg-surface-800/90 border-brand-500 shadow-lg shadow-brand-500/10'
                  : 'bg-surface-900 border-surface-700/60 hover:border-slate-500 hover:bg-surface-800/60'
              )}
            >
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-surface-950/60 border border-surface-700/40">
                  {getNodeIcon(node.category)}
                </div>
                <Badge variant="outline" size="sm" className="capitalize">
                  {node.category.replace('_', ' ')}
                </Badge>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-100">{node.name}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{node.description}</p>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {node.technologies.map((tech) => (
                  <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded bg-surface-950 text-slate-300 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details & Connection Inspector */}
      {selectedNode && (
        <div className="p-4 rounded-xl bg-surface-900 border border-brand-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold text-brand-300 uppercase">
              Connection Inspector: {selectedNode.name}
            </h4>
            <span className="text-[11px] text-slate-400">Click node to inspect data flow</span>
          </div>

          <div className="space-y-2">
            {architecture.connections
              .filter((c) => c.from === selectedNode.id || c.to === selectedNode.id)
              .map((conn, idx) => {
                const targetNode = architecture.nodes.find(
                  (n) => n.id === (conn.from === selectedNode.id ? conn.to : conn.from)
                );
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-surface-950/60 border border-surface-700/40 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 font-mono text-slate-200">
                      <span>{conn.from === selectedNode.id ? selectedNode.name : targetNode?.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{conn.to === selectedNode.id ? selectedNode.name : targetNode?.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-mono">
                        {conn.protocol}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
