export type VoiceRecordingState =
  | 'idle'
  | 'listening'
  | 'processing'
  | 'transcribing'
  | 'complete'
  | 'error';

export interface VoiceTranscript {
  rawText: string;
  confidence: number;
  extractedInterests?: string[];
  extractedPreferredTech?: string[];
  extractedTargetWeeks?: number;
  timestamp: string;
}
