import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ResumeAnalyzerPage } from '../pages/Resume/ResumeAnalyzerPage';
import { ResumeUploader } from '../components/resume/ResumeUploader';
import { ResumeScoreCard } from '../components/resume/ResumeScoreCard';
import { ATSScoreResult, JobMatchResult, ResumeTextMetadata } from '../types/resume';

const mockATSScore: ATSScoreResult = {
  totalScore: 82,
  rating: 'Strong',
  breakdown: [
    { category: 'Contact Information', score: 10, maxScore: 10, feedback: 'Clear contact details' },
    { category: 'Resume Structure', score: 13, maxScore: 15, feedback: 'Standard sections present' },
    { category: 'Technical Skills', score: 18, maxScore: 20, feedback: 'Strong tech stack' },
    { category: 'Work Experience', score: 16, maxScore: 20, feedback: 'Action verbs used' },
    { category: 'Project Portfolio', score: 13, maxScore: 15, feedback: 'Good engineering projects' },
    { category: 'Education & Certs', score: 8, maxScore: 10, feedback: 'Degree listed' },
    { category: 'Formatting & Layout', score: 4, maxScore: 10, feedback: 'Multiple column layout detected' },
  ],
};

const mockMetadata: ResumeTextMetadata = {
  characterCount: 2400,
  wordCount: 450,
  pageCount: 1,
  format: 'pdf',
};

const mockJobMatch: JobMatchResult = {
  jobMatchScore: 78,
  matchedKeywords: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  missingKeywords: ['Docker', 'Kubernetes'],
  weakKeywords: ['REST APIs'],
  alignmentFeedback: 'Strong overall alignment with target engineering competencies.',
};

describe('Resume ATS Analyzer Components', () => {
  it('renders ResumeUploader dropzone correctly', () => {
    const handleFileSelect = vi.fn();
    render(
      <ResumeUploader
        selectedFile={null}
        onFileSelect={handleFileSelect}
        disabled={false}
      />
    );

    expect(screen.getByText(/Drag & drop your resume file here/i)).toBeInTheDocument();
    expect(screen.getByText(/browse files/i)).toBeInTheDocument();
  });

  it('renders ResumeScoreCard with ATS Score and Job Match', () => {
    render(<ResumeScoreCard atsScore={mockATSScore} metadata={mockMetadata} jobMatch={mockJobMatch} />);

    expect(screen.getByText('82')).toBeInTheDocument();
    expect(screen.getByText(/ATS COMPATIBILITY SCORE/i)).toBeInTheDocument();
    expect(screen.getByText(/JOB MATCH OVERLAP/i)).toBeInTheDocument();
    expect(screen.getByText('78%')).toBeInTheDocument();
  });

  it('renders ResumeAnalyzerPage header workspace title', () => {
    render(
      <BrowserRouter>
        <ResumeAnalyzerPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Resume ATS Analyzer')).toBeInTheDocument();
  });
});
