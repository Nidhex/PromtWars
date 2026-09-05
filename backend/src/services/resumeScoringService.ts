import {
  ParsedResumeStructure,
  ATSScoreResult,
  JobMatchResult,
} from '../types/resume.js';

const KNOWN_SKILLS_KEYWORDS = [
  'javascript', 'typescript', 'react', 'next.js', 'vue', 'angular', 'node.js', 'express',
  'python', 'fastapi', 'flask', 'django', 'java', 'spring', 'c++', 'c#', '.net', 'sql',
  'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'pinecone', 'docker',
  'kubernetes', 'aws', 'azure', 'gcp', 'git', 'github', 'ci/cd', 'rest api', 'graphql',
  'machine learning', 'deep learning', 'pytorch', 'tensorflow', 'scikit-learn', 'pandas',
  'numpy', 'nlp', 'computer vision', 'rag', 'llm', 'tailwind', 'bootstrap', 'html', 'css',
  'testing', 'jest', 'vitest', 'cypress', 'linux', 'system design', 'agile', 'scrum'
];

const ACTION_VERBS = [
  'developed', 'built', 'designed', 'architected', 'implemented', 'created', 'engineered',
  'optimized', 'accelerated', 'improved', 'increased', 'reduced', 'streamlined', 'deployed',
  'spearheaded', 'led', 'managed', 'refactored', 'integrated', 'automated', 'launched',
  'collaborated', 'scaled', 'mentored', 'analyzed', 'orchestrated'
];

export function parseResumeStructure(text: string): ParsedResumeStructure {
  const lower = text.toLowerCase();

  // 1. Contact Signals
  const emailMatch = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const phoneMatch = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
  const linkedinMatch = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i.test(text) || lower.includes('linkedin');
  const githubMatch = /github\.com\/[a-zA-Z0-9_-]+/i.test(text) || lower.includes('github') || lower.includes('portfolio');

  // Guess name if first line is 2-4 words and short
  const firstLine = text.split('\n')[0]?.trim() || '';
  const hasName = firstLine.length > 2 && firstLine.length < 50 && !firstLine.includes('@');

  // 2. Recognized Sections
  const hasSummary = /summary|profile|about me|objective/i.test(lower);
  const hasSkills = /skills|technical skills|technologies|expertise|competencies/i.test(lower);
  const hasExperience = /experience|employment|work history|career/i.test(lower);
  const hasProjects = /projects|key projects|engineering projects|academic projects/i.test(lower);
  const hasEducation = /education|academic background|qualification|university|college|b\.tech|b\.e\.|m\.tech/i.test(lower);
  const hasCertifications = /certifications|certificates|licenses|courses/i.test(lower);

  // 3. Technical Skills Extraction
  const detectedSkills = KNOWN_SKILLS_KEYWORDS.filter((skill) => lower.includes(skill));

  // 4. Bullet Points & Action Verb Signals
  const lines = text.split('\n').map((l) => l.trim());
  const bulletPointCount = lines.filter((l) => l.startsWith('•') || l.startsWith('-') || l.startsWith('*') || /^\d+\./.test(l)).length;

  const words = lower.split(/\W+/);
  const actionVerbCount = words.filter((w) => ACTION_VERBS.includes(w)).length;

  // 5. Metric Impact Signals (percentages, numbers like 40%, 10k, $500, 2x, etc.)
  const metricMatches = text.match(/\b\d+(\.\d+)?(%|k|x|ms|s|sec|hrs|users|clients|\$)?\b/gi) || [];
  const metricImpactCount = metricMatches.length;

  return {
    contactInfo: {
      hasName,
      hasEmail: emailMatch,
      hasPhone: phoneMatch,
      hasLinkedIn: linkedinMatch,
      hasGitHubOrPortfolio: githubMatch,
    },
    sections: {
      hasSummary,
      hasSkills,
      hasExperience,
      hasProjects,
      hasEducation,
      hasCertifications,
    },
    detectedSkills,
    bulletPointCount,
    actionVerbCount,
    metricImpactCount,
    totalWords: words.length,
  };
}

export const resumeScoringService = {
  calculateATSScore(structure: ParsedResumeStructure, text: string): ATSScoreResult {
    // 1. Contact & Header (10 pts)
    let contactScore = 0;
    if (structure.contactInfo.hasName) contactScore += 3;
    if (structure.contactInfo.hasEmail) contactScore += 3;
    if (structure.contactInfo.hasPhone) contactScore += 2;
    if (structure.contactInfo.hasLinkedIn || structure.contactInfo.hasGitHubOrPortfolio) contactScore += 2;
    contactScore = Math.min(10, contactScore);

    // 2. Resume Structure (15 pts)
    let structScore = 0;
    if (structure.sections.hasSummary) structScore += 2;
    if (structure.sections.hasSkills) structScore += 3;
    if (structure.sections.hasExperience || structure.sections.hasProjects) structScore += 5;
    if (structure.sections.hasEducation) structScore += 3;
    if (structure.sections.hasCertifications || structure.sections.hasProjects) structScore += 2;
    structScore = Math.min(15, structScore);

    // 3. Skills & Keywords (20 pts)
    let skillsScore = Math.min(20, Math.round((structure.detectedSkills.length / 10) * 20));

    // 4. Experience Quality (20 pts)
    let expScore = 0;
    if (structure.bulletPointCount >= 4) expScore += 8;
    else if (structure.bulletPointCount >= 2) expScore += 5;
    if (structure.actionVerbCount >= 5) expScore += 6;
    else if (structure.actionVerbCount >= 2) expScore += 3;
    if (structure.metricImpactCount >= 3) expScore += 6;
    else if (structure.metricImpactCount >= 1) expScore += 3;
    expScore = Math.min(20, expScore);

    // 5. Projects (15 pts)
    let projScore = 0;
    if (structure.sections.hasProjects) projScore += 8;
    if (structure.detectedSkills.length >= 5) projScore += 4;
    if (text.toLowerCase().includes('github') || text.toLowerCase().includes('demo') || text.toLowerCase().includes('live')) projScore += 3;
    projScore = Math.min(15, projScore);

    // 6. Education (10 pts)
    let eduScore = structure.sections.hasEducation ? 10 : 4;

    // 7. ATS Readability (10 pts)
    let readScore = 10;
    if (text.length < 200) readScore -= 4;
    if (/[^\x00-\x7F]/.test(text.slice(0, 500)) && (text.match(/[^\x00-\x7F]/g)?.length || 0) > 50) readScore -= 3; // Excessive non-ASCII
    readScore = Math.max(2, readScore);

    const totalScore = Math.min(100, contactScore + structScore + skillsScore + expScore + projScore + eduScore + readScore);

    const rating: 'Strong' | 'Moderate' | 'Needs Work' =
      totalScore >= 80 ? 'Strong' : totalScore >= 60 ? 'Moderate' : 'Needs Work';

    return {
      totalScore,
      rating,
      breakdown: [
        {
          category: 'Contact & Header',
          score: contactScore,
          maxScore: 10,
          feedback: contactScore >= 8 ? 'Complete contact details detected.' : 'Include email, phone, and LinkedIn/GitHub links.',
        },
        {
          category: 'Resume Structure',
          score: structScore,
          maxScore: 15,
          feedback: structScore >= 12 ? 'Logical section hierarchy detected.' : 'Add missing standard sections (Summary, Skills, Projects, Education).',
        },
        {
          category: 'Skills & Keywords',
          score: skillsScore,
          maxScore: 20,
          feedback: skillsScore >= 15 ? `Extracted ${structure.detectedSkills.length} recognizable technical keywords.` : 'Add explicit technical skills & framework tags.',
        },
        {
          category: 'Experience Quality',
          score: expScore,
          maxScore: 20,
          feedback: expScore >= 15 ? 'Strong action verbs & quantifiable metrics found.' : 'Use bullet points starting with strong action verbs and include metrics (e.g. 20% speedup).',
        },
        {
          category: 'Projects',
          score: projScore,
          maxScore: 15,
          feedback: projScore >= 12 ? 'Relevant project titles and technology context identified.' : 'Highlight 2-3 engineering projects with tech stack and live links.',
        },
        {
          category: 'Education',
          score: eduScore,
          maxScore: 10,
          feedback: eduScore === 10 ? 'Education section clearly identified.' : 'Add degree, institution name, and graduation year.',
        },
        {
          category: 'ATS Readability',
          score: readScore,
          maxScore: 10,
          feedback: readScore >= 8 ? 'Clean text extraction for ATS parsers.' : 'Avoid complex graphic elements, tables, or non-standard characters.',
        },
      ],
    };
  },

  calculateJobMatch(_structure: ParsedResumeStructure, resumeText: string, jobDescription?: string): JobMatchResult | null {
    if (!jobDescription || jobDescription.trim().length === 0) {
      return null;
    }

    const jdLower = jobDescription.toLowerCase();
    const resumeLower = resumeText.toLowerCase();

    // Extract potential keywords from Job Description
    const jdKeywords = KNOWN_SKILLS_KEYWORDS.filter((k) => jdLower.includes(k));
    
    // Add additional capital words from JD if any
    const extraJdWords = (jobDescription.match(/\b[A-Z][a-zA-Z0-9+#.]+\b/g) || [])
      .map((w) => w.toLowerCase())
      .filter((w) => w.length > 2 && !['the', 'and', 'with', 'for', 'about', 'must', 'have'].includes(w));

    const allJdKeywords = Array.from(new Set([...jdKeywords, ...extraJdWords])).slice(0, 20);

    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];
    const weakKeywords: string[] = [];

    allJdKeywords.forEach((kw) => {
      const occurrences = (resumeLower.match(new RegExp(`\\b${kw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\b`, 'g')) || []).length;
      if (occurrences >= 2) {
        matchedKeywords.push(kw);
      } else if (occurrences === 1) {
        weakKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const matchRatio = allJdKeywords.length > 0 ? (matchedKeywords.length + weakKeywords.length * 0.5) / allJdKeywords.length : 0.7;
    const jobMatchScore = Math.min(100, Math.max(0, Math.round(matchRatio * 100)));

    let alignmentFeedback = `Matched ${matchedKeywords.length} of ${allJdKeywords.length} key target job requirements.`;
    if (missingKeywords.length > 0) {
      alignmentFeedback += ` Consider incorporating relevant experience with ${missingKeywords.slice(0, 3).join(', ')} if you genuinely possess these skills.`;
    }

    return {
      jobMatchScore,
      matchedKeywords,
      missingKeywords,
      weakKeywords,
      alignmentFeedback,
    };
  },
};
