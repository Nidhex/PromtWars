import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppShell } from '../../components/layout/AppShell';
import { useProjectDetails } from '../../hooks/useProjectDetails';
import { ScoreCard } from '../../components/scores/ScoreCard';
import { ScoreBreakdown } from '../../components/scores/ScoreBreakdown';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import {
  ArrowRight,
  Sparkles,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Cpu,
  Wand2,
  FileCode2,
} from 'lucide-react';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { project, loading, error, improving, improveIdea } = useProjectDetails(id || 'proj_medtech_01');

  const [improveModalOpen, setImproveModalOpen] = useState(false);
  const [improvePrompt, setImprovePrompt] = useState('');

  if (loading) {
    return (
      <AppShell>
        <LoadingState label="Loading Project Details..." />
      </AppShell>
    );
  }

  if (error || !project) {
    return (
      <AppShell>
        <ErrorState message={error || 'Project not found'} />
      </AppShell>
    );
  }

  const handleApplyImprovement = async () => {
    if (!improvePrompt.trim()) return;
    await improveIdea(improvePrompt);
    setImproveModalOpen(false);
    setImprovePrompt('');
  };

  return (
    <AppShell activeProjectTitle={project.title}>
      <div className="space-y-8">
        {/* Top Banner & Main CTAs */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-900 border border-surface-700/60 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <Badge variant="cyan" className="font-semibold">
                {project.domain}
              </Badge>
              <Badge variant="brand" className="font-semibold">
                {project.difficulty}
              </Badge>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {project.estimatedWeeks} Weeks Estimated
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">{project.tagline}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="md"
              onClick={() => setImproveModalOpen(true)}
              leftIcon={<Wand2 className="w-4 h-4 text-cyan-400" />}
            >
              Improve Idea
            </Button>

            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate('/blueprint')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Build My Project
            </Button>
          </div>
        </div>

        {/* Health Scores & Compatibility Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <ScoreCard scores={project.scores} />

            {/* Why this fits you card */}
            <Card className="bg-surface-900 border border-brand-500/30">
              <CardHeader>
                <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Why This Fits Your Student Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                {project.whyThisFitsYou.map((reason, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200">{reason}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase">Compatibility Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreBreakdown scores={project.scores} />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Spec Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem & Solution */}
          <Card>
            <CardHeader>
              <CardTitle>Problem & Target Users</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Problem Statement:
                </span>
                <p className="text-slate-300 leading-relaxed bg-surface-950/60 p-3 rounded-lg border border-surface-700/40">
                  {project.problemStatement}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Target Users:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.targetUsers.map((user) => (
                    <span key={user} className="px-2.5 py-1 rounded-md bg-surface-950 text-slate-200 border border-surface-700/50">
                      {user}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features & AI Components */}
          <Card>
            <CardHeader>
              <CardTitle>Core Features & AI Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase block mb-1 font-semibold">
                  Core Engineering Features:
                </span>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  {project.keyFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase block mb-1 font-semibold flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" />
                  AI & Model Components:
                </span>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  {project.aiComponents.map((ai, i) => (
                    <li key={i}>{ai}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risks & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Mitigation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Scope & Technical Risk Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {project.risks.map((risk) => (
                <div key={risk.id} className="p-3.5 rounded-xl bg-surface-950/60 border border-surface-700/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-100">{risk.description}</span>
                    <Badge variant={risk.severity === 'high' ? 'rose' : 'amber'} size="sm">
                      {risk.severity} Risk
                    </Badge>
                  </div>
                  <p className="text-emerald-400 font-medium">
                    <span className="text-slate-400">Mitigation Strategy:</span> {risk.mitigation}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span>AI Engineering Advice</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {project.recommendations.map((rec) => (
                <div key={rec.id} className="p-3.5 rounded-xl bg-surface-950/60 border border-brand-500/30 space-y-1">
                  <h4 className="font-semibold text-slate-100">{rec.title}</h4>
                  <p className="text-slate-300">{rec.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-6 rounded-2xl bg-surface-900 border border-surface-700/60 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100">Ready to build this project?</h3>
            <p className="text-xs text-slate-400">Generate the complete engineering blueprint & roadmap timeline.</p>
          </div>

          <Button
            variant="gradient"
            size="lg"
            onClick={() => navigate('/blueprint')}
            leftIcon={<FileCode2 className="w-4 h-4" />}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Generate Blueprint
          </Button>
        </div>

        {/* Improve Idea Popup Modal */}
        <Modal
          isOpen={improveModalOpen}
          onClose={() => setImproveModalOpen(false)}
          title="Improve & Customization Workspace"
          description="Tell the AI mentor how to adapt or modify this project concept for your team."
          maxWidth="md"
        >
          <div className="space-y-4">
            <Textarea
              label="Improvement Instructions"
              placeholder="e.g., Focus more on low-resource clinical datasets, or simplify backend to single container..."
              value={improvePrompt}
              onChange={(e) => setImprovePrompt(e.target.value)}
              rows={4}
            />

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-700/40">
              <Button variant="ghost" size="sm" onClick={() => setImproveModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleApplyImprovement}
                isLoading={improving}
                leftIcon={<Wand2 className="w-3.5 h-3.5" />}
              >
                Apply Improvements
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AppShell>
  );
};
