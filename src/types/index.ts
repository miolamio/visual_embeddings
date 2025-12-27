export interface Phrase {
  id: string;
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
