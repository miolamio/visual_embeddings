import { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner'
import { Header } from './components/Header'
import { PhraseInput } from './components/PhraseInput'
import { PhraseList } from './components/PhraseList'
import { SimilarityDisplay } from './components/SimilarityDisplay'
import { SettingsDialog } from './components/SettingsDialog'
import { InfoBlock } from './components/InfoBlock'
import { getEmbedding, checkConnection } from './lib/embeddings'
import { cosineSimilarity, interpretSimilarity, normalizeSimilarity } from './lib/similarity'
import type { Phrase, Settings, SimilarityResult } from './types'

const DEFAULT_SETTINGS: Settings = {
  provider: 'ollama',
  model: 'bge-m3',
  ollamaBaseUrl: 'http://localhost:11434',
  openaiApiKey: undefined,
}

function App() {
  const [phrases, setPhrases] = useState<Phrase[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [similarityResult, setSimilarityResult] = useState<SimilarityResult | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('embedding-explorer-settings')
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse settings', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('embedding-explorer-settings', JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    if (selectedIds.length === 2) {
      const phraseA = phrases.find(p => p.id === selectedIds[0])
      const phraseB = phrases.find(p => p.id === selectedIds[1])
      
      if (phraseA && phraseB) {
        const similarity = cosineSimilarity(phraseA.embedding, phraseB.embedding)
        const result: SimilarityResult = {
          phraseA,
          phraseB,
          similarity,
          normalizedSimilarity: normalizeSimilarity(similarity),
          interpretation: interpretSimilarity(similarity),
        }
        setSimilarityResult(result)
      }
    } else {
      setSimilarityResult(null)
    }
  }, [selectedIds, phrases])

  const handleAddPhrase = async (text: string) => {
    setIsLoading(true)
    try {
      const embedding = await getEmbedding(text, settings)
      const newPhrase: Phrase = {
        id: crypto.randomUUID(),
        text,
        embedding,
        createdAt: new Date(),
        provider: settings.provider,
        model: settings.model,
      }
      setPhrases(prev => [...prev, newPhrase])
      toast.success('Фраза добавлена')
    } catch (error) {
      console.error('Error getting embedding:', error)
      if (error instanceof Error) {
        if (error.message.includes('Ollama')) {
          toast.error('Ollama не запущен. Запустите `ollama serve`')
        } else if (error.message.includes('OpenAI')) {
          toast.error('Ошибка OpenAI API. Проверьте API ключ')
        } else {
          toast.error(`Ошибка: ${error.message}`)
        }
      } else {
        toast.error('Не удалось получить эмбеддинг')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleSelection = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id)
      } else {
        if (prev.length >= 2) {
          return [...prev.slice(1), id]
        } else {
          return [...prev, id]
        }
      }
    })
  }

  const handleDeletePhrase = (id: string) => {
    setPhrases(prev => prev.filter(p => p.id !== id))
    setSelectedIds(prev => prev.filter(i => i !== id))
    toast.success('Фраза удалена')
  }

  const handleTestConnection = async () => {
    try {
      const result = await checkConnection(settings)
      if (result) {
        toast.success('Подключение успешно')
      } else {
        toast.error('Не удалось подключиться')
      }
      return result
    } catch (error) {
      toast.error('Ошибка подключения')
      return false
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenSettings={() => setSettingsOpen(true)} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <PhraseInput onAddPhrase={handleAddPhrase} isLoading={isLoading} />
          
          <SimilarityDisplay result={similarityResult} />
          
          <PhraseList
            phrases={phrases}
            selectedIds={selectedIds}
            onToggleSelection={handleToggleSelection}
            onDeletePhrase={handleDeletePhrase}
          />

          <InfoBlock />
        </div>
      </main>

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={settings}
        onSettingsChange={setSettings}
        onTestConnection={handleTestConnection}
      />

      <Toaster position="bottom-right" richColors />
    </div>
  )
}

export default App
