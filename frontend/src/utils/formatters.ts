export function formatScore(score: number): string {
  return `${Math.round(score)}%`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getScoreColorClass(score: number): {
  bg: string;
  text: string;
  border: string;
  fill: string;
} {
  if (score >= 90) {
    return {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      fill: '#10b981',
    };
  }
  if (score >= 75) {
    return {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      fill: '#06b6d4',
    };
  }
  if (score >= 60) {
    return {
      bg: 'bg-brand-500/10',
      text: 'text-brand-300',
      border: 'border-brand-500/30',
      fill: '#6366f1',
    };
  }
  return {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    fill: '#f59e0b',
  };
}
