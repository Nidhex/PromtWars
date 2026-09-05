import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VoiceInputModal } from '../components/voice/VoiceInputModal';

describe('VoiceInputModal Component', () => {
  it('renders modal title and microphone recording trigger when open', () => {
    render(<VoiceInputModal isOpen={true} onClose={() => {}} />);

    expect(screen.getByText('Voice Intake & Project Prompting')).toBeInTheDocument();
    expect(screen.getByLabelText('Start voice recording')).toBeInTheDocument();
  });
});
