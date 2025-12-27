import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PhraseItem } from "./PhraseItem";
import type { Phrase } from "../types";

interface PhraseListProps {
  phrases: Phrase[];
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
  onDeletePhrase: (id: string) => void;
}

export function PhraseList({ phrases, selectedIds, onToggleSelection, onDeletePhrase }: PhraseListProps) {
  if (phrases.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground py-8">
            Добавьте первую фразу для начала работы
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Фразы для сравнения</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {phrases.map((phrase) => (
          <PhraseItem
            key={phrase.id}
            phrase={phrase}
            isSelected={selectedIds.includes(phrase.id)}
            onToggle={onToggleSelection}
            onDelete={onDeletePhrase}
          />
        ))}
      </CardContent>
    </Card>
  );
}
