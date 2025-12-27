import { getOllamaEmbedding, checkOllamaConnection } from './ollama';
import { getOpenAIEmbedding, checkOpenAIConnection } from './openai';
import type { EmbeddingProvider, Settings } from '../../types';

export async function getEmbedding(text: string, settings: Settings): Promise<number[]> {
  if (settings.provider === 'ollama') {
    return getOllamaEmbedding(text, settings.model, settings.ollamaBaseUrl);
  } else if (settings.provider === 'openai') {
    if (!settings.openaiApiKey) {
      throw new Error('OpenAI API key is required');
    }
    return getOpenAIEmbedding(text, settings.model, settings.openaiApiKey);
  }
  throw new Error(`Unknown provider: ${settings.provider}`);
}

export async function checkConnection(settings: Settings): Promise<boolean> {
  if (settings.provider === 'ollama') {
    return checkOllamaConnection(settings.ollamaBaseUrl);
  } else if (settings.provider === 'openai') {
    if (!settings.openaiApiKey) {
      return false;
    }
    return checkOpenAIConnection(settings.openaiApiKey);
  }
  return false;
}

export const AVAILABLE_MODELS = {
  ollama: [
    { id: 'bge-m3', name: 'BGE-M3', provider: 'ollama' as EmbeddingProvider, dimensions: 1024 },
  ],
  openai: [
    { id: 'text-embedding-ada-002', name: 'Ada 002', provider: 'openai' as EmbeddingProvider, dimensions: 1536 },
    { id: 'text-embedding-3-small', name: 'Embedding 3 Small', provider: 'openai' as EmbeddingProvider, dimensions: 1536 },
    { id: 'text-embedding-3-large', name: 'Embedding 3 Large', provider: 'openai' as EmbeddingProvider, dimensions: 3072 },
  ]
};
