import { useState, useEffect, useMemo } from 'react'
import { Toaster, toast } from 'sonner'
import { Header } from './components/Header'
import { PhraseInput } from './components/PhraseInput'
import { PhraseList } from './components/PhraseList'
import { SimilarityDisplay } from './components/SimilarityDisplay'
import { SimilarityMatrix } from './components/SimilarityMatrix'
import { ScatterPlot } from './components/ScatterPlot'
import { PhraseLegend } from './components/PhraseLegend'
import { SettingsDialog } from './components/SettingsDialog'
import { InfoBlock } from './components/InfoBlock'
import { Footer } from './components/Footer'
import { getEmbedding, checkConnection } from './lib/embeddings'
import { cosineSimilarity, interpretSimilarity, normalizeSimilarity } from './lib/similarity'
import { buildSimilarityMatrix } from './lib/matrix'
import { projectToScatter } from './lib/projection'
import type { Phrase, Settings, SimilarityResult, ScatterData } from './types'
import { LABELS } from './types'

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
  const [scatterData, setScatterData] = useState<ScatterData>({ points: [], isComputing: false })

  const matrix = useMemo(() => {
    if (phrases.length === 0) return { labels: [], values: [], phrases: [] }
    return buildSimilarityMatrix(phrases)
  }, [phrases])

  useEffect(() => {
    if (phrases.length >= 3) {
      setScatterData({ points: [], isComputing: true })
      projectToScatter(phrases)
        .then(points => setScatterData({ points, isComputing: false }))
        .catch(() => setScatterData({ points: [], isComputing: false }))
    } else {
      setScatterData({ points: [], isComputing: false })
    }
  }, [phrases])

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
    if (phrases.length >= 26) {
      toast.error('Достигнут максимум фраз (A-Z)')
      return
    }
    
    setIsLoading(true)
    try {
      const embedding = await getEmbedding(text, settings)
      const label = LABELS[phrases.length]
      const newPhrase: Phrase = {
        id: crypto.randomUUID(),
        label,
        text,
        embedding,
        createdAt: new Date(),
        provider: settings.provider,
        model: settings.model,
      }
      setPhrases(prev => [...prev, newPhrase])
      toast.success(`Фраза ${label} добавлена`)
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

  const handleMatrixCellClick = (rowIndex: number, colIndex: number) => {
    if (rowIndex === colIndex) return
    const phraseA = phrases[rowIndex]
    const phraseB = phrases[colIndex]
    setSelectedIds([phraseA.id, phraseB.id])
  }

  const handleScatterPointClick = (point: any) => {
    const phrase = phrases.find(p => p.label === point.label)
    if (phrase) {
      setSelectedIds(prev => {
        if (prev.includes(phrase.id)) {
          return prev.filter(id => id !== phrase.id)
        }
        if (prev.length >= 2) {
          return [...prev.slice(1), phrase.id]
        }
        return [...prev, phrase.id]
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenSettings={() => setSettingsOpen(true)} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          <PhraseInput onAddPhrase={handleAddPhrase} isLoading={isLoading} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <SimilarityDisplay result={similarityResult} />
              
              <SimilarityMatrix 
                matrix={matrix} 
                onCellClick={handleMatrixCellClick}
              />
              
              <ScatterPlot 
                points={scatterData.points}
                onPointClick={handleScatterPointClick}
              />
            </div>
            
            <div className="space-y-6">
              <PhraseList
                phrases={phrases}
                selectedIds={selectedIds}
                onToggleSelection={handleToggleSelection}
                onDeletePhrase={handleDeletePhrase}
              />
              
              <PhraseLegend phrases={phrases} />
            </div>
          </div>

          <InfoBlock />
        </div>
      </main>

      <Footer />

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
