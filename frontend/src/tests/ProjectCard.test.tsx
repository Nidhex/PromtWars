import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ProjectCard } from '../components/projects/ProjectCard';
import { mockProjectIdeas } from '../services/mockData';

describe('ProjectCard Component', () => {
  const project = mockProjectIdeas[0];

  it('renders project title, domain, scores, and CTA button', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={project} />
      </BrowserRouter>
    );

    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.domain)).toBeInTheDocument();
    expect(screen.getByText('Build This')).toBeInTheDocument();
  });
});
