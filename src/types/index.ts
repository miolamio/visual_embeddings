export type PhraseLabel = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' |
                   'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' |
                   'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

export const LABELS: PhraseLabel[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
];

export interface Phrase {
  id: string;
  label: PhraseLabel;
  text: string;
  embedding: number[];
  createdAt: Date;
  provider: EmbeddingProvider;
  model: string;
}

export type EmbeddingProvider = 'ollama' | 'openai';

export interface EmbeddingModel {
  id: string;
  name: string;
  provider: EmbeddingProvider;
  dimensions: number;
}

export interface Settings {
  provider: EmbeddingProvider;
  model: string;
  openaiApiKey?: string;
  ollamaBaseUrl: string;
}

export interface SimilarityResult {
  phraseA: Phrase;
  phraseB: Phrase;
  similarity: number;
  normalizedSimilarity: number;
  interpretation: 'identical' | 'high' | 'medium' | 'low' | 'opposite';
}

export interface SimilarityMatrix {
  labels: PhraseLabel[];
  values: number[][];
  phrases: Phrase[];
}

export interface ProjectedPoint {
  label: PhraseLabel;
  text: string;
  x: number;
  y: number;
  originalIndex: number;
}

export interface ScatterData {
  points: ProjectedPoint[];
  isComputing: boolean;
}
