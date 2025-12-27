import { UMAP } from 'umap-js';
import type { Phrase, ProjectedPoint } from '../types';

export async function projectToScatter(phrases: Phrase[]): Promise<ProjectedPoint[]> {
  if (phrases.length < 3) {
    throw new Error('UMAP requires at least 3 points');
  }
  
  const embeddings = phrases.map(p => p.embedding);
  
  const umap = new UMAP({
    nComponents: 2,
    nNeighbors: Math.min(15, phrases.length - 1),
    minDist: 0.1,
    spread: 1.0,
    random: Math.random,
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
