import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../components/layout/AppShell';
import { useStudentProfile } from '../../hooks/useStudentProfile';
import { useProjects } from '../../hooks/useProjects';
import { useRoadmap } from '../../hooks/useRoadmap';
import { ScoreCard } from '../../components/scores/ScoreCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import {
  Sparkles,
  Compass,
  FileCode2,
  Map,
  Bot,
  User,
  ArrowRight,
  Code2,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, loading: profileLoading, error: profileError } = useStudentProfile();
  const { projects, loading: projectsLoading } = useProjects();
  const { roadmap, loading: roadmapLoading } = useRoadmap('proj_medtech_01');

  if (profileLoading || projectsLoading || roadmapLoading) {
    return (
      <AppShell>
        <LoadingState label="Loading Personalized Student Workspace..." />
      </AppShell>
    );
  }

  if (profileError || !profile) {
    return (
      <AppShell>
        <ErrorState message={profileError || 'Failed to load student context'} />
      </AppShell>
    );
  }

  const activeProject = projects.find((p) => p.id === profile.activeProjectId) || projects[0];

  return (
    <AppShell activeProjectTitle={activeProject?.title}>
      <div className="space-y-8">
        {/* Header Greeting & Primary Action */}
        <div className="p-6 rounded-2xl bg-surface-900 border border-surface-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                {profile.institution}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Good morning, {profile.fullName.split(' ')[0]} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Let's turn your skills into something worth building.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/profile')}
              leftIcon={<User className="w-3.5 h-3.5 text-slate-400" />}
            >
              Update Profile
            </Button>

            <Button
              variant="gradient"
              size="md"
              onClick={() => navigate('/discover')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start a Project
            </Button>
          </div>
        </div>

        {/* Student Context Card & Active Project Health Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Profile Context Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
                <User className="w-4 h-4 text-brand-400" />
                <span>Student Context</span>
              </CardTitle>
              <Badge variant="brand" size="sm">
                {profile.experienceLevel}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Degree & Major:</span>
                <p className="font-semibold text-slate-200">{profile.degree}</p>
                <p className="text-slate-400">{profile.major} (Class of {profile.graduationYear})</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1 flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-cyan-400" /> Key Skills:
                </span>
                <div className="flex flex-wrap gap-1">
                  {profile.skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill.id}
                      className="text-[10px] px-2 py-0.5 rounded bg-surface-950 text-slate-300 border border-surface-700/50 font-mono"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Target Duration & Hardware:
                </span>
                <p className="font-semibold text-slate-200">
                  {profile.targetDurationWeeks} Weeks ({profile.weeklyHours}h/week) • {profile.teamSize.toUpperCase()}
                </p>
                <p className="text-slate-400 truncate">{profile.hardwareConstraints[0]}</p>
              </div>
            </CardContent>
          </Card>

          {/* Active Project Health Breakdown */}
          {activeProject && (
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-100 uppercase font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Active Project Health Evaluation</span>
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/projects/${activeProject.id}`)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  View Details
                </Button>
              </div>

              <ScoreCard scores={activeProject.scores} />
            </div>
          )}
        </div>

        {/* Workspace Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="interactive" onClick={() => navigate('/discover')}>
            <CardContent className="p-5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">Discover Ideas</h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                Filter personalized AI project concepts matching your skills.
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive" onClick={() => navigate('/blueprint')}>
            <CardContent className="p-5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-brand-500/15 text-brand-400 flex items-center justify-center">
                <FileCode2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">Engineering Blueprint</h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                Inspect architecture diagrams, DB schemas, and API specs.
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive" onClick={() => navigate('/roadmap')}>
            <CardContent className="p-5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Map className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">Interactive Roadmap</h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                Track milestone phases, tasks, deliverables, and dependencies.
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive" onClick={() => navigate('/mentor')}>
            <CardContent className="p-5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">Context AI Mentor</h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                Ask engineering questions with pinned project context.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Roadmap Snapshot Widget */}
        {roadmap && (
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-emerald-400" />
                <CardTitle className="text-sm font-mono uppercase">Roadmap Progress Snapshot</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/roadmap')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Go to Roadmap
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressBar
                value={roadmap.overallProgressPercentage}
                showValueLabel
                label={`${roadmap.projectTitle} - Progress`}
                variant="emerald"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {roadmap.phases.slice(0, 3).map((phase) => (
                  <div key={phase.id} className="p-3 rounded-lg bg-surface-950/60 border border-surface-700/40 text-xs">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                      Phase 0{phase.phaseNumber}
                    </span>
                    <p className="font-semibold text-slate-100 truncate mt-0.5">{phase.name}</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {phase.milestones.length} Milestones
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
};
