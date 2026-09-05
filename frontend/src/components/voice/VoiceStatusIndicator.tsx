import React from 'react';
import { VoiceRecordingState } from '../../types/voice';
import { Badge } from '../ui/Badge';
import { Mic, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export interface VoiceStatusIndicatorProps {
  state: VoiceRecordingState;
}

export const VoiceStatusIndicator: React.FC<VoiceStatusIndicatorProps> = ({ state }) => {
  switch (state) {
    case 'listening':
      return (
        <Badge variant="brand" className="gap-1.5 animate-pulse">
          <Mic className="w-3 h-3 text-brand-400" />
          <span>Listening... Speak Now</span>
        </Badge>
      );
    case 'processing':
    case 'transcribing':
      return (
        <Badge variant="cyan" className="gap-1.5">
          <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
          <span>AI Voice Transcription...</span>
        </Badge>
      );
    case 'complete':
      return (
        <Badge variant="emerald" className="gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Transcript Confirmed</span>
        </Badge>
      );
    case 'error':
      return (
        <Badge variant="rose" className="gap-1.5">
          <AlertCircle className="w-3 h-3 text-rose-400" />
          <span>Processing Error</span>
        </Badge>
      );
    default:
      return (
        <Badge variant="default" className="gap-1.5">
          <Mic className="w-3 h-3 text-slate-400" />
          <span>Idle</span>
        </Badge>
      );
  }
};
