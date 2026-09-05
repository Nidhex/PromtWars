import { VoiceTranscript } from '../types/voice';
import { ServiceResponse } from '../types/common';

export const voiceService = {
  async processVoiceAudio(
    audioBlobOrText: Blob | string
  ): Promise<ServiceResponse<VoiceTranscript>> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const sampleTranscript: VoiceTranscript = {
      rawText:
        typeof audioBlobOrText === 'string' && audioBlobOrText.length > 0
          ? audioBlobOrText
          : 'I want to build an intelligent healthcare assistant using FastAPI and React that helps screen clinical trial documents and find patient matches without hallucinations within 12 weeks.',
      confidence: 0.96,
      extractedInterests: ['Healthcare & MedTech', 'Clinical Trials', 'Multimodal RAG'],
      extractedPreferredTech: ['React', 'FastAPI', 'Python', 'PostgreSQL'],
      extractedTargetWeeks: 12,
      timestamp: new Date().toISOString(),
    };

    return {
      success: true,
      data: sampleTranscript,
      timestamp: new Date().toISOString(),
    };
  },

  isBrowserSpeechSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    );
  },
};
