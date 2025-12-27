import { cosineSimilarity } from './similarity';
import type { Phrase, SimilarityMatrix } from '../types';

export function buildSimilarityMatrix(phrases: Phrase[]): SimilarityMatrix {
  const n = phrases.length;
  const labels = phrases.map(p => p.label);
  const values: number[][] = [];
  
  for (let i = 0; i < n; i++) {
    values[i] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) {
        values[i][j] = 1.0;
      } else if (j < i) {
        values[i][j] = values[j][i];
      } else {
        values[i][j] = cosineSimilarity(
          phrases[i].embedding,
          phrases[j].embedding
        );
      }
    }
  }
  
  return { labels, values, phrases };
}
