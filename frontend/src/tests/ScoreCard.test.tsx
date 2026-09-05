import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ScoreCard } from '../components/scores/ScoreCard';

describe('ScoreCard Component', () => {
  const sampleScores = {
    overall: 94,
    skillMatch: 96,
    interestMatch: 98,
    feasibility: 90,
    innovation: 92,
    technicalDepth: 94,
  };

  it('renders overall score and metric breakdown correctly', () => {
    render(<ScoreCard scores={sampleScores} />);

    expect(screen.getByText('PROJECT HEALTH')).toBeInTheDocument();
    expect(screen.getByText('94')).toBeInTheDocument();
    expect(screen.getByText('Skill Match')).toBeInTheDocument();
    expect(screen.getByText('96')).toBeInTheDocument();
    expect(screen.getByText('Interest Match')).toBeInTheDocument();
    expect(screen.getByText('98')).toBeInTheDocument();
    expect(screen.getByText('Feasibility')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
    expect(screen.getByText('Innovation')).toBeInTheDocument();
    expect(screen.getByText('92')).toBeInTheDocument();
  });
});
