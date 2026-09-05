import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';

describe('AppShell Component', () => {
  it('renders branding title, sidebar navigation, and children content', () => {
    render(
      <BrowserRouter>
        <AppShell>
          <div data-testid="workspace-content">Child Content</div>
        </AppShell>
      </BrowserRouter>
    );

    expect(screen.getAllByText('AI Project Mentor')[0]).toBeInTheDocument();
    expect(screen.getByTestId('workspace-content')).toBeInTheDocument();
    expect(screen.getByText('Discover Projects')).toBeInTheDocument();
  });
});
