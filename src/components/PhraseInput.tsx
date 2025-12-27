import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface PhraseInputProps {
  onAddPhrase: (text: string) => Promise<void>;
  isLoading: boolean;
}

export function PhraseInput({ onAddPhrase, isLoading }: PhraseInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    
    await onAddPhrase(text.trim());
    setText("");
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите фразу..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !text.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Загрузка
              </>
            ) : (
              "Добавить"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
