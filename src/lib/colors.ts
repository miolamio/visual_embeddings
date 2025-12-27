export function getSimilarityColor(value: number): string {
  if (value >= 0.95) return '#374151';
  if (value >= 0.90) return '#991b1b';
  if (value >= 0.85) return '#b91c1c';
  if (value >= 0.80) return '#dc2626';
  if (value >= 0.75) return '#ef4444';
  if (value >= 0.70) return '#f87171';
  if (value >= 0.65) return '#fb923c';
  if (value >= 0.60) return '#f97316';
  if (value >= 0.55) return '#fb923c';
  if (value >= 0.50) return '#fbbf24';
  if (value >= 0.45) return '#a855f7';
  if (value >= 0.40) return '#9333ea';
  if (value >= 0.35) return '#8b5cf6';
  if (value >= 0.30) return '#7c3aed';
  if (value >= 0.25) return '#6366f1';
  if (value >= 0.20) return '#4f46e5';
  if (value >= 0.15) return '#3b82f6';
  if (value >= 0.10) return '#2563eb';
  if (value >= 0.05) return '#1d4ed8';
  return '#1e3a8a';
}

export function getSimilarityColorHSL(value: number): string {
  const hue = (1 - value) * 220;
  const saturation = 70;
  const lightness = 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function getTextColorForBackground(bgColor: string): string {
  return '#ffffff';
}
