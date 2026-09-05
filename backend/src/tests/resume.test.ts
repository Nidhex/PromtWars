import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';
import {
  parseResumeStructure,
  resumeScoringService,
} from '../services/resumeScoringService.js';

const sampleResumeText = `
Alex Mercer
alex.mercer@gmail.com | +1 (555) 019-2834 | linkedin.com/in/alexmercer | github.com/alexmercer

PROFESSIONAL SUMMARY
Senior Software & AI Engineer with 4 years of experience building RAG systems, web microservices, and React dashboards.

SKILLS
Programming: JavaScript, TypeScript, Python, C++, SQL
Frameworks & ML: React, Node.js, Express, FastAPI, PyTorch, TensorFlow
Databases & Cloud: PostgreSQL, MongoDB, Docker, AWS, Git, CI/CD

EXPERIENCE
Software Engineer - Tech Corp (2022 - Present)
- Engineered RESTful microservices using Node.js and Express, improving API latency by 35%.
- Built interactive React & TypeScript dashboards serving 10,000+ daily active users.
- Automated CI/CD deployment pipelines on AWS using Docker and GitHub Actions.

PROJECTS
MedAssist AI - Clinical Trial Screener
- Developed a Python FastAPI RAG tool using Gemini API and PostgreSQL pgvector.
- Implemented vector similarity indexing to reduce document extraction time by 50%.

EDUCATION
B.Tech in Computer Science & Engineering - State University (2018 - 2022)
`;

describe('Resume Structure Parser & Scoring Engine', () => {
  it('parses contact information and sections correctly', () => {
    const structure = parseResumeStructure(sampleResumeText);

    expect(structure.contactInfo.hasEmail).toBe(true);
    expect(structure.contactInfo.hasPhone).toBe(true);
    expect(structure.contactInfo.hasLinkedIn).toBe(true);
    expect(structure.contactInfo.hasGitHubOrPortfolio).toBe(true);

    expect(structure.sections.hasSummary).toBe(true);
    expect(structure.sections.hasSkills).toBe(true);
    expect(structure.sections.hasExperience).toBe(true);
    expect(structure.sections.hasProjects).toBe(true);
    expect(structure.sections.hasEducation).toBe(true);

    expect(structure.detectedSkills).toContain('react');
    expect(structure.detectedSkills).toContain('typescript');
    expect(structure.detectedSkills).toContain('python');
    expect(structure.detectedSkills).toContain('docker');
  });

  it('computes deterministic 7-category ATS score (0-100)', () => {
    const structure = parseResumeStructure(sampleResumeText);
    const scoreResult = resumeScoringService.calculateATSScore(structure, sampleResumeText);

    expect(scoreResult.totalScore).toBeGreaterThanOrEqual(75);
    expect(scoreResult.totalScore).toBeLessThanOrEqual(100);
    expect(scoreResult.rating).toBe('Strong');
    expect(scoreResult.breakdown).toHaveLength(7);
  });

  it('computes job match percentage and missing keywords when job description is provided', () => {
    const structure = parseResumeStructure(sampleResumeText);
    const jobDescription = 'Looking for a Senior Python Developer with React, Docker, Kubernetes, and Redis experience.';

    const jobMatch = resumeScoringService.calculateJobMatch(structure, sampleResumeText, jobDescription);

    expect(jobMatch).not.toBeNull();
    if (jobMatch) {
      expect(jobMatch.jobMatchScore).toBeGreaterThan(30);
      expect(jobMatch.matchedKeywords).toContain('python');
      expect(jobMatch.matchedKeywords).toContain('react');
      expect(jobMatch.matchedKeywords).toContain('docker');
      expect(jobMatch.missingKeywords).toContain('kubernetes');
      expect(jobMatch.missingKeywords).toContain('redis');
    }
  });
});

describe('POST /api/resume/analyze Endpoint', () => {
  it('returns 400 Bad Request when no file is uploaded', async () => {
    const res = await request(app).post('/api/resume/analyze');
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('No resume file uploaded');
  });

  it('analyzes uploaded text file buffer and returns structured report', async () => {
    const res = await request(app)
      .post('/api/resume/analyze')
      .attach('file', Buffer.from(sampleResumeText), 'resume.pdf')
      .field('jobDescription', 'Target role: Full Stack AI Engineer');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('atsScore');
    expect(res.body.data.atsScore.totalScore).toBeGreaterThan(60);
    expect(res.body.data).toHaveProperty('qualitativeAnalysis');
    expect(res.body.data.qualitativeAnalysis).toHaveProperty('topImprovements');
  });
});
