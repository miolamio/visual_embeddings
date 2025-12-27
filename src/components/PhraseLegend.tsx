import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PhraseBadge } from "./PhraseBadge";
import type { Phrase } from "../types";

interface PhraseLegendProps {
  phrases: Phrase[];
}

export function PhraseLegend({ phrases }: PhraseLegendProps) {
  if (phrases.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Легенда</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {phrases.map((phrase) => (
            <div key={phrase.id} className="flex items-center gap-3">
              <PhraseBadge label={phrase.label} size="sm" />
              <span className="text-sm text-foreground truncate">{phrase.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
