export function getSimilarityColor(value: number): string {
  if (value >= 0.95) return '#374151';
  if (value >= 0.8) return '#dc2626';
  if (value >= 0.6) return '#ef4444';
  if (value >= 0.4) return '#f97316';
  if (value >= 0.2) return '#8b5cf6';
  return '#3b82f6';
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
