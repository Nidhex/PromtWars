import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { VoiceStatusIndicator } from './VoiceStatusIndicator';
import { VoiceWaveform } from './VoiceWaveform';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { VoiceTranscript } from '../../types/voice';
import { Mic, MicOff, RefreshCw, Sparkles, Check } from 'lucide-react';

export interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptReady?: (transcript: VoiceTranscript) => void;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  onTranscriptReady,
}) => {
  const {
    state,
    transcript,
    errorMessage,
    interimText,
    startListening,
    stopListening,
    resetVoice,
    updateTranscriptText,
  } = useVoiceInput((t) => onTranscriptReady?.(t));

  const handleConfirm = () => {
    if (transcript) {
      onTranscriptReady?.(transcript);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Voice Intake & Project Prompting"
      description="Speak your project idea, constraints, or goals. Our AI mentor will transcribe and structure your requirements."
      maxWidth="lg"
    >
      <div className="space-y-6 text-center">
        {/* Status Badge */}
        <div className="flex justify-center">
          <VoiceStatusIndicator state={state} />
        </div>

        {/* Animated Waveform / Microphone Trigger */}
        <div className="p-8 bg-surface-950/60 border border-surface-700/60 rounded-2xl flex flex-col items-center justify-center space-y-4">
          <VoiceWaveform isListening={state === 'listening'} />

          <p className="text-xs text-slate-400 max-w-sm">
            {state === 'idle' && 'Click the microphone button to start recording your voice input.'}
            {state === 'listening' && 'Tell us what you want to build, your preferred stack, or constraints...'}
            {state === 'transcribing' && 'Transcribing voice audio via AI pipeline...'}
            {state === 'complete' && 'Review your transcribed prompt below or edit before confirming.'}
          </p>

          {/* Large Microphone Button */}
          {state === 'idle' && (
            <button
              onClick={startListening}
              aria-label="Start voice recording"
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white flex items-center justify-center shadow-xl shadow-brand-500/20 hover:scale-105 transition-all focus-ring"
            >
              <Mic className="w-8 h-8" />
            </button>
          )}

          {state === 'listening' && (
            <button
              onClick={stopListening}
              aria-label="Stop voice recording"
              className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-xl shadow-rose-600/30 animate-pulse focus-ring"
            >
              <MicOff className="w-8 h-8" />
            </button>
          )}
        </div>

        {/* Live Interim / Transcript Preview */}
        {(interimText || transcript) && (
          <div className="text-left space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Transcript Preview:</span>
              </span>
              {transcript && (
                <span className="font-mono text-[11px] text-emerald-400">
                  Confidence: {Math.round(transcript.confidence * 100)}%
                </span>
              )}
            </div>

            <Textarea
              value={transcript ? transcript.rawText : interimText}
              onChange={(e) => updateTranscriptText(e.target.value)}
              rows={3}
              className="text-sm font-sans"
              placeholder="Live transcript preview..."
            />

            {/* Extracted Entity Pills if complete */}
            {transcript?.extractedInterests && transcript.extractedInterests.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 self-center font-mono">Identified Domains:</span>
                {transcript.extractedInterests.map((interest) => (
                  <span
                    key={interest}
                    className="text-[10px] px-2 py-0.5 rounded bg-brand-500/15 text-brand-300 border border-brand-500/30 font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400">
            {errorMessage}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-700/40">
          <Button variant="outline" size="sm" onClick={resetVoice} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Reset / Retry
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleConfirm}
            disabled={!transcript && !interimText}
            leftIcon={<Check className="w-3.5 h-3.5" />}
          >
            Confirm & Apply to Profile
          </Button>
        </div>
      </div>
    </Modal>
  );
};
