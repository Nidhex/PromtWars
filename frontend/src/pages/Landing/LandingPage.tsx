import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { ScoreRing } from '../../components/scores/ScoreRing';
import {
  Sparkles,
  ArrowRight,
  Compass,
  FileCode2,
  Map,
  Bot,
  User,
  ShieldCheck,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const workflowSteps = [
    {
      step: '01',
      title: 'Understand You',
      desc: 'Ingests your skills, resume PDF, voice prompt, hardware constraints, and team size.',
      icon: User,
    },
    {
      step: '02',
      title: 'Discover Ideas',
      desc: 'Generates personalized final-year project concepts across high-value engineering domains.',
      icon: Compass,
    },
    {
      step: '03',
      title: 'Validate Scope',
      desc: 'Scores Fit, Feasibility, Innovation, and Hallucination Risks before committing.',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'Build Blueprint',
      desc: 'Generates system architecture, database schemas, REST APIs, and AI model pipelines.',
      icon: FileCode2,
    },
    {
      step: '05',
      title: 'Execute Roadmap',
      desc: 'Provides a 5-phase milestone schedule with task checklists and deliverable tracking.',
      icon: Map,
    },
    {
      step: '06',
      title: 'Ask AI Mentor',
      desc: 'Context-aware engineering copilot that knows your exact project code & architecture.',
      icon: Bot,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      {/* Top Header */}
      <header className="px-6 py-5 border-b border-surface-700/50 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-base text-white tracking-tight">AI Project Mentor</span>
            <span className="text-[10px] font-mono text-cyan-400 block">AI Engineering Copilot</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/discover')}>
            Explore Ideas
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/dashboard')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Launch Workspace
          </Button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 sm:py-20 space-y-20 w-full">
        {/* Hero Copy */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs text-brand-300 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Not a Generic Chatbot — An AI Engineering Workspace</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Find the right project.{' '}
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Build it with confidence.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            An AI project mentor that understands your skills, interests, experience, and constraints —
            then turns them into an audit-ready engineering blueprint and interactive roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate('/dashboard')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto px-8"
            >
              Build My Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const el = document.getElementById('how-it-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto"
            >
              Explore How It Works
            </Button>
          </div>
        </div>

        {/* Product Workspace Preview Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-900/90 border border-surface-700/80 shadow-2xl space-y-6 relative overflow-hidden ai-gradient-border">
          <div className="flex items-center justify-between border-b border-surface-700/50 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">
                workspace // medtrial-ai-screening.spec
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
              Health Match: 94%
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-surface-950/80">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-bold">PROJECT SCORE</span>
                  <ScoreRing score={94} size="sm" />
                </div>
                <h4 className="text-sm font-bold text-slate-100">MedTrial AI Screener</h4>
                <p className="text-xs text-slate-400">
                  Multimodal RAG patient eligibility screening against ClinicalTrials.gov protocols.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface-950/80 lg:col-span-2">
              <CardContent className="p-4 space-y-3">
                <span className="text-xs font-mono text-brand-300 font-bold uppercase block">
                  Generated Architecture Preview:
                </span>
                <div className="p-3 rounded-lg bg-surface-900 border border-surface-700/50 text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span>Client (React/TS) ──▶ FastAPI Gateway ──▶ Gemini 1.5 Pro</span>
                  <span className="text-emerald-400">Verified Citation Engine</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/15 text-brand-300 border border-brand-500/30">
                    FastAPI
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/15 text-cyan-300 border border-cyan-500/30">
                    pgvector
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/15 text-amber-300 border border-amber-500/30">
                    Gemini API
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 6-Step Workflow Section */}
        <div id="how-it-works" className="space-y-10 pt-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How AI Project Mentor Works</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              A continuous 6-phase engineering workflow from initial profile discovery to deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.step} variant="interactive" className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-400">{s.step}</span>
                    <div className="p-2 rounded-lg bg-surface-800 text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-100">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-700/50 py-8 px-6 text-center text-xs text-slate-400 font-mono max-w-7xl mx-auto w-full">
        <p>AI Project Mentor • Built for Final-Year Engineering Students</p>
      </footer>
    </div>
  );
};
