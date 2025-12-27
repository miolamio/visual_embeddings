export function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same dimensions');
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += vectorA[i] * vectorA[i];
    normB += vectorB[i] * vectorB[i];
  }
  
  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  
  if (normA === 0 || normB === 0) {
    return 0;
  }
  
  return dotProduct / (normA * normB);
}

export function interpretSimilarity(similarity: number): 'identical' | 'high' | 'medium' | 'low' | 'opposite' {
  if (similarity >= 0.95) return 'identical';
  if (similarity >= 0.7) return 'high';
  if (similarity >= 0.4) return 'medium';
  if (similarity >= 0.1) return 'low';
  return 'opposite';
}

export function normalizeSimilarity(similarity: number): number {
  return (similarity + 1) / 2;
}
