import { useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import type { Settings, EmbeddingProvider } from "../types";
import { AVAILABLE_MODELS } from "../lib/embeddings";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  onTestConnection: () => Promise<boolean>;
}

export function SettingsDialog({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
  onTestConnection,
}: SettingsDialogProps) {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<boolean | null>(null);

  const handleProviderChange = (provider: EmbeddingProvider) => {
    const defaultModel = provider === 'ollama' 
      ? AVAILABLE_MODELS.ollama[0].id 
      : AVAILABLE_MODELS.openai[0].id;
    
    onSettingsChange({
      ...settings,
      provider,
      model: defaultModel,
    });
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const result = await onTestConnection();
      setTestResult(result);
    } catch (error) {
      setTestResult(false);
    } finally {
      setTesting(false);
    }
  };

  const models = settings.provider === 'ollama' 
    ? AVAILABLE_MODELS.ollama 
    : AVAILABLE_MODELS.openai;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Настройки</DialogTitle>
          <DialogDescription>
            Выберите провайдер эмбеддингов и настройте параметры подключения
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="provider">Провайдер</Label>
            <Select
              value={settings.provider}
              onValueChange={(value) => handleProviderChange(value as EmbeddingProvider)}
            >
              <SelectTrigger id="provider">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ollama">Ollama (локальный)</SelectItem>
                <SelectItem value="openai">OpenAI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Модель</Label>
            <Select
              value={settings.model}
              onValueChange={(value) => onSettingsChange({ ...settings, model: value })}
            >
              <SelectTrigger id="model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {settings.provider === 'ollama' && (
            <div className="space-y-2">
              <Label htmlFor="ollama-url">Ollama Base URL</Label>
              <Input
                id="ollama-url"
                value={settings.ollamaBaseUrl}
                onChange={(e) => onSettingsChange({ ...settings, ollamaBaseUrl: e.target.value })}
                placeholder="http://localhost:11434"
              />
            </div>
          )}

          {settings.provider === 'openai' && (
            <div className="space-y-2">
              <Label htmlFor="api-key">OpenAI API Key</Label>
              <Input
                id="api-key"
                type="password"
                value={settings.openaiApiKey || ''}
                onChange={(e) => onSettingsChange({ ...settings, openaiApiKey: e.target.value })}
                placeholder="sk-..."
              />
              <p className="text-xs text-muted-foreground">
                API ключ сохраняется локально в браузере
              </p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              onClick={handleTestConnection}
              disabled={testing}
              variant="outline"
              className="flex-1"
            >
              {testing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Проверка...
                </>
              ) : (
                "Проверить подключение"
              )}
            </Button>
            {testResult !== null && (
              <div className="flex items-center gap-1">
                {testResult ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-green-500">Успешно</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="text-sm text-red-500">Ошибка</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
