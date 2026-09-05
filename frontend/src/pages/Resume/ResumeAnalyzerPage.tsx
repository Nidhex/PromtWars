import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useResumeAnalyzer } from '../../hooks/useResumeAnalyzer';
import { ResumeUploader } from '../../components/resume/ResumeUploader';
import { JobDescriptionInput } from '../../components/resume/JobDescriptionInput';
import { ResumeAnalysisProgress } from '../../components/resume/ResumeAnalysisProgress';
import { ResumeScoreCard } from '../../components/resume/ResumeScoreCard';
import { ResumeScoreBreakdown } from '../../components/resume/ResumeScoreBreakdown';
import { ResumeSectionAnalysis } from '../../components/resume/ResumeSectionAnalysis';
import { ResumeKeywordAnalysis } from '../../components/resume/ResumeKeywordAnalysis';
import { ResumeRecommendations } from '../../components/resume/ResumeRecommendations';
import { Button } from '../../components/ui/Button';
import { Sparkles, ArrowRight, RotateCcw, AlertCircle, ShieldCheck } from 'lucide-react';

export const ResumeAnalyzerPage: React.FC = () => {
  const {
    selectedFile,
    setSelectedFile,
    jobDescription,
    setJobDescription,
    stage,
    progressPercent,
    error,
    report,
    analyzeResume,
    resetAnalyzer,
  } = useResumeAnalyzer();

  const isAnalyzing = stage !== 'idle' && stage !== 'success' && stage !== 'error';

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto pb-12">
        {/* Page Hero Header */}
        <section className="p-8 sm:p-10 rounded-3xl bg-surface-900 border border-surface-700/60 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              AI ENGINEERING RESUME ENGINE
            </span>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Resume ATS Analyzer
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Upload your resume to evaluate ATS readability, skills, keywords, content quality, and alignment with your target engineering role.
            </p>
          </div>
        </section>

        {/* Upload Form & Configuration Workspace */}
        {stage !== 'success' && (
          <div className="space-y-6">
            {isAnalyzing ? (
              <ResumeAnalysisProgress stage={stage} progressPercent={progressPercent} />
            ) : (
              <div className="space-y-6">
                <ResumeUploader
                  selectedFile={selectedFile}
                  onFileSelect={setSelectedFile}
                  disabled={isAnalyzing}
                />

                <JobDescriptionInput
                  jobDescription={jobDescription}
                  onJobDescriptionChange={setJobDescription}
                  disabled={isAnalyzing}
                />

                {error && (
                  <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 flex items-start gap-3 text-left animate-in fade-in">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="space-y-2 flex-1">
                      <h4 className="text-xs font-bold text-rose-200">Unable to analyze resume</h4>
                      <p className="text-xs text-rose-300/90 leading-relaxed">{error}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={analyzeResume}
                        leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                        className="text-xs border-rose-500/40 text-rose-200 hover:bg-rose-900/40 mt-1"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                )}

                <div className="text-center pt-2">
                  <Button
                    variant="gradient"
                    size="lg"
                    disabled={!selectedFile || isAnalyzing}
                    onClick={analyzeResume}
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    className="px-10 py-4 text-base font-bold shadow-xl shadow-brand-500/20"
                  >
                    Analyze My Resume →
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Successful Analysis Report Workspace */}
        {report && stage === 'success' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Analysis Report Generated</h2>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={resetAnalyzer}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Analyze Another Resume
              </Button>
            </div>

            {/* Score Radial Card */}
            <ResumeScoreCard
              atsScore={report.atsScore}
              metadata={report.metadata}
              jobMatch={report.jobMatch}
            />

            {/* Score Category Breakdown */}
            <ResumeScoreBreakdown breakdown={report.atsScore.breakdown} />

            {/* Keyword Analysis Chips */}
            <ResumeKeywordAnalysis
              jobMatch={report.jobMatch}
              keywordRecommendations={report.qualitativeAnalysis.keywordRecommendations}
            />

            {/* Section Analysis & Before/After Suggestions */}
            <ResumeSectionAnalysis analysis={report.qualitativeAnalysis} />

            {/* Top Improvement Checklist & Assessment */}
            <ResumeRecommendations
              topImprovements={report.qualitativeAnalysis.topImprovements}
              overallAssessment={report.qualitativeAnalysis.overallAssessment}
            />
          </div>
        )}
      </div>
    </AppShell>
  );
};
