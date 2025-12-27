import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import type { SimilarityResult } from "../types";

interface SimilarityDisplayProps {
  result: SimilarityResult | null;
}

const interpretationLabels = {
  identical: "Идентичные",
  high: "Высокое сходство",
  medium: "Среднее сходство",
  low: "Низкое сходство",
  opposite: "Противоположные значения"
};

const interpretationColors = {
  identical: "bg-green-500",
  high: "bg-green-600",
  medium: "bg-yellow-500",
  low: "bg-orange-500",
  opposite: "bg-red-500"
};

export function SimilarityDisplay({ result }: SimilarityDisplayProps) {
  if (!result) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground py-8">
            Выберите две фразы для вычисления косинусного сходства
          </div>
        </CardContent>
      </Card>
    );
  }

  const percentage = result.normalizedSimilarity * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Косинусное сходство</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Значение:</span>
            <span className="text-2xl font-bold">{result.similarity.toFixed(4)}</span>
          </div>
          <Progress value={percentage} className="h-3" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
            <Badge className={interpretationColors[result.interpretation]}>
              {interpretationLabels[result.interpretation]}
            </Badge>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground mb-2">Формула:</div>
          <code className="block p-3 bg-secondary rounded text-xs font-mono">
            cos(A, B) = (A · B) / (||A|| × ||B||)
          </code>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <div><strong>Фраза A:</strong> {result.phraseA.text}</div>
          <div><strong>Фраза B:</strong> {result.phraseB.text}</div>
        </div>
      </CardContent>
    </Card>
  );
}
