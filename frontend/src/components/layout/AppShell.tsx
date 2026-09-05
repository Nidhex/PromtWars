import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import { VoiceInputModal } from '../voice/VoiceInputModal';
import { useStudentProfile } from '../../hooks/useStudentProfile';
import { VoiceTranscript } from '../../types/voice';

export interface AppShellProps {
  children: React.ReactNode;
  activeProjectTitle?: string;
}

export const AppShell: React.FC<AppShellProps> = ({ children, activeProjectTitle }) => {
  const { profile } = useStudentProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const handleVoiceTranscriptReady = (transcript: VoiceTranscript) => {
    // Inform user or pre-fill state
    console.log('Voice transcript captured:', transcript.rawText);
  };

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col md:flex-row antialiased selection:bg-brand-500 selection:text-white">
      {/* Desktop Left Sidebar */}
      <Sidebar
        profile={profile}
        activeProjectTitle={activeProjectTitle}
        className="hidden md:flex shrink-0"
      />

      {/* Mobile Drawer Menu */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-16 md:pb-0">
        <Topbar
          onMobileMenuToggle={() => setMobileMenuOpen((prev) => !prev)}
          onVoiceClick={() => setVoiceModalOpen(true)}
          activeProjectTitle={activeProjectTitle}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>
      </div>

      {/* Voice Interaction Modal */}
      <VoiceInputModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onTranscriptReady={handleVoiceTranscriptReady}
      />
    </div>
  );
};
