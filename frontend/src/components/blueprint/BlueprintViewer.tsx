import React, { useState } from 'react';
import { ProjectBlueprint } from '../../types/blueprint';
import { Tabs } from '../ui/Tabs';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { TechStackGrid } from './TechStackGrid';
import { ApiTable } from './ApiTable';
import { AiPipelineViewer } from './AiPipelineViewer';
import { BlueprintExportModal } from './BlueprintExportModal';
import {
  FileText,
  Layers,
  Cpu,
  Database,
  Globe,
  ShieldCheck,
  Download,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export interface BlueprintViewerProps {
  blueprint: ProjectBlueprint;
  onRegenerate?: () => void;
  regenerating?: boolean;
}

export const BlueprintViewer: React.FC<BlueprintViewerProps> = ({
  blueprint,
  onRegenerate,
  regenerating = false,
}) => {
  const [activeTab, setActiveTab] = useState('architecture');
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview & Scope', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'techstack', label: 'Tech Stack', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'architecture', label: 'System Architecture', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'aipipeline', label: 'AI & Data Pipeline', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'database', label: 'DB Schema', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'apis', label: 'API Specifications', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'security', label: 'Security & CI/CD', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-surface-900 border border-surface-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-cyan-400 font-semibold">
              SPEC VERSION: {blueprint.version}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-mono">
              Updated {new Date(blueprint.lastUpdated).toLocaleDateString()}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">{blueprint.projectTitle}</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">{blueprint.problemStatement}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExportModalOpen(true)}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Blueprint (.md)
          </Button>

          {onRegenerate && (
            <Button
              variant="primary"
              size="sm"
              onClick={onRegenerate}
              isLoading={regenerating}
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Re-Synthesize Spec
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Panels */}
      <div className="pt-2">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Core Objectives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                {blueprint.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200">{obj}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Tier Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold block mb-1">
                    MVP Core Features:
                  </span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {blueprint.coreFeatures.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold block mb-1">
                    Innovation Features:
                  </span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {blueprint.innovationFeatures.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'techstack' && <TechStackGrid techStack={blueprint.techStackSummary} />}

        {activeTab === 'architecture' && (
          <Card>
            <CardHeader>
              <CardTitle>System Component Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <ArchitectureDiagram architecture={blueprint.systemArchitecture} />
            </CardContent>
          </Card>
        )}

        {activeTab === 'aipipeline' && (
          <Card>
            <CardHeader>
              <CardTitle>AI & Vector Search Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <AiPipelineViewer steps={blueprint.aiPipeline} />
            </CardContent>
          </Card>
        )}

        {activeTab === 'database' && (
          <div className="space-y-4">
            {blueprint.databaseSchema.map((col) => (
              <Card key={col.name}>
                <CardHeader className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <CardTitle className="font-mono text-sm">{col.name}</CardTitle>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300">
                    {col.type}
                  </span>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-surface-950/60 border-b border-surface-700/40 text-slate-400 font-mono text-[10px] uppercase">
                        <th className="p-3">Field Name</th>
                        <th className="p-3">Data Type</th>
                        <th className="p-3">Key Constraint</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-700/30">
                      {col.fields.map((f) => (
                        <tr key={f.name} className="hover:bg-surface-800/40 font-mono">
                          <td className="p-3 font-semibold text-slate-100">{f.name}</td>
                          <td className="p-3 text-cyan-300">{f.type}</td>
                          <td className="p-3">
                            {f.isPrimaryKey && (
                              <span className="px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 text-[10px]">
                                PK
                              </span>
                            )}
                            {f.isForeignKey && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                                FK
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-slate-400 font-sans text-xs">{f.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'apis' && (
          <Card>
            <CardHeader>
              <CardTitle>REST API Service Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <ApiTable endpoints={blueprint.apiEndpoints} />
            </CardContent>
          </Card>
        )}

        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security & Compliance Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                {blueprint.securityConsiderations.map((sec, i) => (
                  <div key={i} className="p-3 rounded-lg bg-surface-950/60 border border-surface-700/40 text-slate-200">
                    {sec}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployment & Cost Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-surface-950/60 border border-surface-700/40">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Staging Environment:</span>
                  <p className="text-slate-200">{blueprint.deploymentPlan.staging}</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-950/60 border border-surface-700/40">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Production Infrastructure:</span>
                  <p className="text-slate-200">{blueprint.deploymentPlan.production}</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-950/60 border border-surface-700/40">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">Cost Estimate:</span>
                  <p className="text-emerald-300 font-semibold">{blueprint.deploymentPlan.costEstimate}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Export Modal */}
      <BlueprintExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        markdownContent={
          `# ${blueprint.projectTitle}\n\n${blueprint.problemStatement}\n\n## Objectives\n` +
          blueprint.objectives.map((o) => `- ${o}`).join('\n')
        }
        projectTitle={blueprint.projectTitle}
      />
    </div>
  );
};
