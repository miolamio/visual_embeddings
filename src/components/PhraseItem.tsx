import { useState } from "react";
import { Trash2, Eye, EyeOff } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { PhraseBadge } from "./PhraseBadge";
import type { Phrase } from "../types";

interface PhraseItemProps {
  phrase: Phrase;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PhraseItem({ phrase, isSelected, onToggle, onDelete }: PhraseItemProps) {
  const [showVector, setShowVector] = useState(false);

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => onToggle(phrase.id)}
        className="mt-1"
      />
      <PhraseBadge label={phrase.label} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <span className="text-foreground">{phrase.text}</span>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowVector(!showVector)}
            >
              {showVector ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(phrase.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {showVector && (
          <div className="mt-2 p-2 bg-secondary rounded text-xs font-mono overflow-x-auto">
            <div className="text-muted-foreground mb-1">
              Вектор ({phrase.embedding.length} измерений):
            </div>
            <div className="break-all">
              [{phrase.embedding.slice(0, 20).map(v => v.toFixed(3)).join(", ")}
              {phrase.embedding.length > 20 ? ", ..." : ""}]
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
