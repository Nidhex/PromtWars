import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';

describe('Dashboard Discovery Workspace Component', () => {
  it('renders hero title, domain selector, project intent, and primary CTA', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Build something that')).toBeInTheDocument();
    expect(screen.getByText('What are you interested in?')).toBeInTheDocument();
    expect(screen.getByText('Tell your AI mentor what you\'re thinking')).toBeInTheDocument();
    expect(screen.getByText('YOUR PROJECT BRIEF SUMMARY')).toBeInTheDocument();
    expect(screen.getByText('Generate My Projects →')).toBeInTheDocument();
  });

  it('allows toggling domains and updates selection state', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

    const domainChip = screen.getByText('Cybersecurity');
    fireEvent.click(domainChip);

    // Selected domain should be checked
    expect(domainChip.closest('button')).toHaveAttribute('aria-pressed', 'true');
  });
});
