import { UMAP } from 'umap-js';
import type { Phrase, ProjectedPoint } from '../types';

function seededRandom(seed: number) {
  let state = seed;
  return function() {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function hashPhrases(phrases: Phrase[]): number {
  const str = phrases.map(p => p.text).join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export async function projectToScatter(phrases: Phrase[]): Promise<ProjectedPoint[]> {
  if (phrases.length < 3) {
    throw new Error('UMAP requires at least 3 points');
  }
  
  const embeddings = phrases.map(p => p.embedding);
  const seed = hashPhrases(phrases);
  
  const umap = new UMAP({
    nComponents: 2,
    nNeighbors: Math.min(15, phrases.length - 1),
    minDist: 0.1,
    spread: 1.0,
    random: seededRandom(seed),
  });
  
  const projection = umap.fit(embeddings);
  
  return phrases.map((phrase, index) => ({
    label: phrase.label,
    text: phrase.text,
    x: projection[index][0],
    y: projection[index][1],
    originalIndex: index,
  }));
}
