import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../components/layout/AppShell';
import { useProjectDiscovery } from '../../hooks/useProjectDiscovery';
import { ProjectDomain, DifficultyLevel } from '../../types/project';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Badge } from '../../components/ui/Badge';
import { VoiceInputModal } from '../../components/voice/VoiceInputModal';
import {
  Sparkles,
  Mic,
  ArrowRight,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { cn } from '../../utils/cn';

const ALL_DOMAINS: { label: ProjectDomain; iconName?: string }[] = [
  { label: 'Artificial Intelligence' },
  { label: 'Machine Learning' },
  { label: 'Web Development' },
  { label: 'Mobile Development' },
  { label: 'Cybersecurity' },
  { label: 'Data Science' },
  { label: 'Computer Vision' },
  { label: 'Cloud & DevOps' },
  { label: 'IoT & Robotics' },
  { label: 'Blockchain' },
  { label: 'Healthcare & MedTech' },
  { label: 'FinTech & Security' },
  { label: 'EdTech & Learning' },
  { label: 'Sustainability & IoT' },
];

const POPULAR_DOMAINS_COUNT = 8;

const PREFERRED_TECH_OPTIONS = [
  'React',
  'TypeScript',
  'Python',
  'FastAPI',
  'PyTorch',
  'Node.js',
  'PostgreSQL',
  'Docker',
  'Firebase',
  'Next.js',
];

const RESOURCE_OPTIONS = ['Laptop only', 'GPU available', 'Cloud available', 'Hardware available'];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    input,
    updateInput,
    toggleDomain,
    toggleResource,
    togglePreferredTech,
    generating,
    progressPercent,
    progressStageText,
    error,
    generateProjects,
  } = useProjectDiscovery();

  const [showAllDomains, setShowAllDomains] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const displayedDomains = showAllDomains ? ALL_DOMAINS : ALL_DOMAINS.slice(0, POPULAR_DOMAINS_COUNT);

  const handleGenerateClick = () => {
    generateProjects(() => {
      navigate('/discover');
    });
  };

  return (
    <AppShell>
      <div className="space-y-10 max-w-5xl mx-auto pb-12">
        {/* ==================================================
            SECTION 1: AI-FIRST HERO
            ================================================== */}
        <section className="p-8 sm:p-10 rounded-3xl bg-surface-900 border border-surface-700/60 shadow-2xl relative overflow-hidden ai-gradient-border space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              AI PROJECT MENTOR WORKSPACE
            </span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Build something that{' '}
              <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                actually fits you.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Tell us what you're interested in, what you know, and what constraints you have. Your AI mentor
              will turn that into realistic, innovative project ideas.
            </p>
          </div>

          {/* Large Hero Interactive Prompt Input */}
          <div className="pt-2">
            <div className="relative flex items-center">
              <Input
                value={input.heroPromptText}
                onChange={(e) => updateInput({ heroPromptText: e.target.value })}
                placeholder="What do you want to build? (e.g. I want to build an innovative AI project for healthcare...)"
                className="py-3.5 pl-4 pr-32 text-sm sm:text-base bg-surface-950/80 border-surface-700 focus:border-brand-500 rounded-xl shadow-inner"
              />
              <div className="absolute right-2 flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVoiceModalOpen(true)}
                  leftIcon={<Mic className="w-3.5 h-3.5 text-brand-400" />}
                  className="text-xs py-1.5 px-2.5 bg-surface-900 border-surface-700 hover:bg-surface-800"
                >
                  <span className="hidden xs:inline">Speak instead</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 2: DOMAIN SELECTION
            ================================================== */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>What are you interested in?</span>
                {input.domains.length > 0 && (
                  <Badge variant="cyan" size="sm">
                    {input.domains.length} selected
                  </Badge>
                )}
              </h2>
              <p className="text-xs text-slate-400">Choose one or more domains to guide your recommendations.</p>
            </div>

            <button
              onClick={() => setShowAllDomains((prev) => !prev)}
              className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1 self-start sm:self-auto focus-ring rounded"
            >
              <span>{showAllDomains ? 'Show less domains' : 'Explore all domains'}</span>
              {showAllDomains ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Multi-Select Domain Chips Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {displayedDomains.map((d) => {
              const isSelected = input.domains.includes(d.label);
              return (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => toggleDomain(d.label)}
                  aria-pressed={isSelected}
                  className={cn(
                    'p-3 rounded-xl border text-left text-xs font-medium transition-all duration-150 flex items-center justify-between gap-2 focus-ring select-none',
                    isSelected
                      ? 'bg-brand-600/20 text-brand-200 border-brand-500 shadow-md font-semibold'
                      : 'bg-surface-900 text-slate-300 border-surface-700/60 hover:border-slate-500 hover:bg-surface-800'
                  )}
                >
                  <span className="truncate">{d.label}</span>
                  {isSelected ? (
                    <span className="w-4 h-4 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ==================================================
            SECTION 3: PROJECT INTENT
            ================================================== */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Tell your AI mentor what you're thinking</h2>
              <p className="text-xs text-slate-400">
                Describe the kind of project you want to build, the problem you care about, or simply what you're curious about.
              </p>
            </div>

            {input.intentText && (
              <button
                onClick={() => updateInput({ intentText: '' })}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 focus-ring rounded"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          <div className="relative">
            <Textarea
              value={input.intentText}
              onChange={(e) => updateInput({ intentText: e.target.value })}
              rows={4}
              placeholder="e.g. I want to use AI to solve a healthcare problem. I know Python and React but don't know much about computer vision..."
              className="text-xs sm:text-sm bg-surface-900 border-surface-700 p-4"
            />

            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVoiceModalOpen(true)}
                leftIcon={<Mic className="w-3.5 h-3.5 text-brand-400" />}
                className="text-[11px] text-slate-400 hover:text-slate-200 bg-surface-950/60"
              >
                Voice Input
              </Button>
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 4: PROJECT PREFERENCES
            ================================================== */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100">Project Preferences & Constraints</h2>
            <p className="text-xs text-slate-400">Configure parameters to ensure recommendations match your timeline and capacity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Experience Level */}
            <Card className="bg-surface-900">
              <CardContent className="p-4 space-y-2">
                <span className="text-xs font-semibold text-slate-200 block">Experience Level:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => updateInput({ experienceLevel: lvl })}
                      className={cn(
                        'py-2 px-3 text-xs capitalize font-medium rounded-lg border transition-all text-center focus-ring select-none',
                        input.experienceLevel === lvl
                          ? 'bg-brand-600/20 text-brand-300 border-brand-500 font-semibold'
                          : 'bg-surface-950 text-slate-400 border-surface-700/60 hover:bg-surface-800'
                      )}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Target Duration */}
            <Card className="bg-surface-900">
              <CardContent className="p-4 space-y-2">
                <span className="text-xs font-semibold text-slate-200 block">Project Duration:</span>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 6].map((months) => (
                    <button
                      key={months}
                      type="button"
                      onClick={() => updateInput({ durationMonths: months })}
                      className={cn(
                        'py-2 px-2 text-xs font-mono font-medium rounded-lg border transition-all text-center focus-ring select-none',
                        input.durationMonths === months
                          ? 'bg-brand-600/20 text-brand-300 border-brand-500 font-semibold'
                          : 'bg-surface-950 text-slate-400 border-surface-700/60 hover:bg-surface-800'
                      )}
                    >
                      {months} {months === 1 ? 'month' : 'mos'}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Size */}
            <Card className="bg-surface-900">
              <CardContent className="p-4 space-y-2">
                <span className="text-xs font-semibold text-slate-200 block">Team Size:</span>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => updateInput({ teamSize: size })}
                      className={cn(
                        'py-2 px-2 text-xs font-mono font-medium rounded-lg border transition-all text-center focus-ring select-none',
                        input.teamSize === size
                          ? 'bg-brand-600/20 text-brand-300 border-brand-500 font-semibold'
                          : 'bg-surface-950 text-slate-400 border-surface-700/60 hover:bg-surface-800'
                      )}
                    >
                      {size === 1 ? 'Solo (1)' : size === 4 ? '4+ members' : `${size} members`}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Difficulty Target */}
            <Card className="bg-surface-900">
              <CardContent className="p-4 space-y-2">
                <span className="text-xs font-semibold text-slate-200 block">Target Difficulty:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Beginner-Friendly', 'Moderate', 'Challenging', 'Advanced'] as DifficultyLevel[]).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => updateInput({ difficulty: diff })}
                      className={cn(
                        'py-2 px-1 text-[11px] font-medium rounded-lg border transition-all text-center focus-ring select-none truncate',
                        input.difficulty === diff
                          ? 'bg-brand-600/20 text-brand-300 border-brand-500 font-semibold'
                          : 'bg-surface-950 text-slate-400 border-surface-700/60 hover:bg-surface-800'
                      )}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resources & Tech Stack Chips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Resources / Hardware */}
            <Card className="bg-surface-900">
              <CardContent className="p-4 space-y-2">
                <span className="text-xs font-semibold text-slate-200 block">Available Resources:</span>
                <div className="flex flex-wrap gap-2">
                  {RESOURCE_OPTIONS.map((res) => {
                    const isSelected = input.resources.includes(res);
                    return (
                      <button
                        key={res}
                        type="button"
                        onClick={() => toggleResource(res)}
                        className={cn(
                          'px-2.5 py-1 text-xs rounded-lg border font-mono transition-colors focus-ring select-none',
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold'
                            : 'bg-surface-950 text-slate-400 border-surface-700/60 hover:bg-surface-800'
                        )}
                      >
                        {res} {isSelected ? '✓' : ''}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Preferred Technologies */}
            <Card className="bg-surface-900">
              <CardContent className="p-4 space-y-2">
                <span className="text-xs font-semibold text-slate-200 block">Preferred Technologies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {PREFERRED_TECH_OPTIONS.map((tech) => {
                    const isSelected = input.preferredTech.includes(tech);
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => togglePreferredTech(tech)}
                        className={cn(
                          'px-2 py-0.5 text-xs rounded-md border font-mono transition-colors focus-ring select-none',
                          isSelected
                            ? 'bg-brand-500/20 text-brand-300 border-brand-500/40 font-semibold'
                            : 'bg-surface-950 text-slate-400 border-surface-700/60 hover:bg-surface-800'
                        )}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ==================================================
            SECTION 5: GENERATION SUMMARY ("YOUR PROJECT BRIEF")
            ================================================== */}
        <section className="p-5 rounded-2xl bg-surface-950/80 border border-brand-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold text-brand-300 uppercase">
                YOUR PROJECT BRIEF SUMMARY
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Updates live from form inputs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-surface-900 border border-surface-700/40">
              <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Target Domains:</span>
              <p className="font-semibold text-slate-100 truncate">
                {input.domains.length > 0 ? input.domains.join(', ') : 'All Domains'}
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-surface-900 border border-surface-700/40">
              <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Scope Parameters:</span>
              <p className="font-semibold text-slate-100">
                {input.experienceLevel.toUpperCase()} • {input.durationMonths} Months • {input.teamSize} Member(s)
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-surface-900 border border-surface-700/40">
              <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Hardware & Stack:</span>
              <p className="font-semibold text-slate-100 truncate">
                {input.resources.length > 0 ? input.resources.join(', ') : 'Standard'}
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 7: PRIMARY CTA & AI GENERATION STATE
            ================================================== */}
        <section className="text-center space-y-4 pt-2">
          {error && (
            <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 max-w-xl mx-auto flex items-start gap-3 text-left animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <h4 className="text-xs font-bold text-rose-200">Unable to generate project ideas</h4>
                <p className="text-xs text-rose-300/90 leading-relaxed">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateClick}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  className="text-xs border-rose-500/40 text-rose-200 hover:bg-rose-900/40 mt-1"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {generating ? (
            <div className="p-6 rounded-2xl bg-surface-900 border border-brand-500/40 max-w-xl mx-auto space-y-4 animate-in fade-in">
              <div className="flex items-center justify-center gap-2 text-sm font-bold text-brand-300">
                <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />
                <span>AI Engineering Pipeline In Progress</span>
              </div>

              <p className="text-xs font-mono text-cyan-300">{progressStageText}</p>

              <div className="w-full bg-surface-950 rounded-full h-2 overflow-hidden border border-surface-700/50">
                <div
                  className="bg-gradient-to-r from-brand-500 to-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Button
                variant="gradient"
                size="lg"
                onClick={handleGenerateClick}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="px-10 py-4 text-base font-bold shadow-xl shadow-brand-500/20"
              >
                Generate My Projects →
              </Button>
              <p className="text-xs text-slate-400">
                AI will analyze your preferences and create personalized project recommendations.
              </p>
            </div>
          )}
        </section>

        {/* Voice Input Integration */}
        <VoiceInputModal
          isOpen={voiceModalOpen}
          onClose={() => setVoiceModalOpen(false)}
          onTranscriptReady={(transcript) => {
            updateInput({
              intentText: transcript.rawText,
              heroPromptText: transcript.rawText,
            });
          }}
        />
      </div>
    </AppShell>
  );
};
