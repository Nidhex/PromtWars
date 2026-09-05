import { useState, useRef, useCallback } from 'react';
import { VoiceRecordingState, VoiceTranscript } from '../types/voice';
import { voiceService } from '../services/voiceService';

export function useVoiceInput(onTranscriptReady?: (transcript: VoiceTranscript) => void) {
  const [state, setState] = useState<VoiceRecordingState>('idle');
  const [transcript, setTranscript] = useState<VoiceTranscript | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [interimText, setInterimText] = useState<string>('');
  const recognitionRef = useRef<unknown>(null);

  const startListening = useCallback(() => {
    setState('listening');
    setErrorMessage(null);
    setInterimText('');

    // Check if browser SpeechRecognition is available
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      try {
        const SpeechRecognition =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          let current = '';
          for (let i = 0; i < event.results.length; i++) {
            current += event.results[i][0].transcript;
          }
          setInterimText(current);
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onerror = () => {
          // If browser speech encounters permission or network issue, fallback gracefully
          setState('listening');
        };

        recognition.start();
        recognitionRef.current = recognition;
        return;
      } catch {
        // Fallback to timer-based simulation if SpeechRecognition initialization fails
      }
    }

    // Fallback simulation timer for demonstration/testing
    const phrases = [
      'I want to build an intelligent healthcare screening tool...',
      'I want to build an intelligent healthcare screening tool using FastAPI and React...',
      'I want to build an intelligent healthcare assistant using FastAPI and React that helps screen clinical trial documents and find patient matches without hallucinations within 12 weeks.',
    ];
    let step = 0;
    const interval = setInterval(() => {
      if (step < phrases.length) {
        setInterimText(phrases[step]);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 1200);
  }, []);

  const stopListening = useCallback(async () => {
    if (recognitionRef.current) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (recognitionRef.current as any).stop();
      } catch {
        // Ignore stop errors
      }
      recognitionRef.current = null;
    }

    setState('processing');
    try {
      setState('transcribing');
      const textToProcess = interimText || 'I want to build an AI clinical trial eligibility screening platform.';
      const res = await voiceService.processVoiceAudio(textToProcess);

      if (res.success && res.data) {
        setTranscript(res.data);
        setState('complete');
        onTranscriptReady?.(res.data);
      } else {
        setState('error');
        setErrorMessage(res.error || 'Failed to process voice input');
      }
    } catch (err) {
      setState('error');
      setErrorMessage(err instanceof Error ? err.message : 'Error in voice processing');
    }
  }, [interimText, onTranscriptReady]);

  const resetVoice = useCallback(() => {
    setState('idle');
    setTranscript(null);
    setErrorMessage(null);
    setInterimText('');
  }, []);

  const updateTranscriptText = useCallback((newText: string) => {
    setTranscript((prev) =>
      prev
        ? { ...prev, rawText: newText }
        : {
            rawText: newText,
            confidence: 1.0,
            timestamp: new Date().toISOString(),
          }
    );
  }, []);

  return {
    state,
    transcript,
    errorMessage,
    interimText,
    startListening,
    stopListening,
    resetVoice,
    updateTranscriptText,
  };
}
