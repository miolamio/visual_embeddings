export async function getOllamaEmbedding(
  text: string, 
  model: string = 'bge-m3',
  baseUrl: string = 'http://localhost:11434'
): Promise<number[]> {
  const response = await fetch(`${baseUrl}/api/embeddings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: model,
      prompt: text
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Ollama API error: ${error}`);
  }
  
  const data = await response.json();
  return data.embedding;
}

export async function checkOllamaConnection(baseUrl: string = 'http://localhost:11434'): Promise<boolean> {
  try {
    const response = await fetch(`${baseUrl}/api/tags`);
    return response.ok;
  } catch (error) {
    return false;
  }
}
