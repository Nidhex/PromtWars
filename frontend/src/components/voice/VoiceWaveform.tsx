import React from 'react';
import { cn } from '../../utils/cn';

export interface VoiceWaveformProps {
  isListening: boolean;
  className?: string;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ isListening, className }) => {
  const bars = [0.4, 0.8, 1.0, 0.6, 0.9, 0.5, 0.7, 0.3];

  return (
    <div className={cn('flex items-center justify-center gap-1.5 h-12 py-1', className)}>
      {bars.map((heightRatio, i) => (
        <span
          key={i}
          className={cn(
            'w-1.5 bg-gradient-to-t from-brand-500 to-cyan-400 rounded-full transition-all duration-300',
            isListening ? 'animate-wave' : 'opacity-40'
          )}
          style={{
            height: isListening ? `${heightRatio * 100}%` : '20%',
            animationDelay: isListening ? `${i * 0.15}s` : '0s',
          }}
        />
      ))}
    </div>
  );
};
