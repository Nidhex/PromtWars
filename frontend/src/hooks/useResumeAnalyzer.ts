import { useState } from 'react';
import { ResumeAnalysisReport, AnalysisStage } from '../types/resume';
import { resumeService } from '../services/resumeService';

export function useResumeAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [stage, setStage] = useState<AnalysisStage>('idle');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ResumeAnalysisReport | null>(null);

  const analyzeResume = async () => {
    if (!selectedFile) {
      setError('Please select a PDF or DOCX resume file first.');
      return;
    }

    setStage('uploading');
    setProgressPercent(20);
    setError(null);

    const stages: { stageKey: AnalysisStage; percent: number }[] = [
      { stageKey: 'uploading', percent: 20 },
      { stageKey: 'extracting', percent: 40 },
      { stageKey: 'checking_ats', percent: 60 },
      { stageKey: 'analyzing', percent: 80 },
      { stageKey: 'preparing_report', percent: 95 },
    ];

    let currentIdx = 0;
    const progressInterval = setInterval(() => {
      if (currentIdx < stages.length - 1) {
        currentIdx++;
        setStage(stages[currentIdx].stageKey);
        setProgressPercent(stages[currentIdx].percent);
      }
    }, 450);

    try {
      const res = await resumeService.analyzeResume(selectedFile, jobDescription);
      clearInterval(progressInterval);

      if (res.success && res.data) {
        setProgressPercent(100);
        setStage('success');
        setReport(res.data);
      } else {
        setStage('error');
        setError(res.error || 'Failed to analyze resume.');
      }
    } catch (err) {
      clearInterval(progressInterval);
      setStage('error');
      setError(err instanceof Error ? err.message : 'Error analyzing resume.');
    }
  };

  const resetAnalyzer = () => {
    setSelectedFile(null);
    setJobDescription('');
    setStage('idle');
    setProgressPercent(0);
    setError(null);
    setReport(null);
  };

  return {
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
  };
}
