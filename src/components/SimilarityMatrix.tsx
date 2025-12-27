import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { getSimilarityColor } from "../lib/colors";
import type { SimilarityMatrix as SimilarityMatrixType } from "../types";

interface SimilarityMatrixProps {
  matrix: SimilarityMatrixType;
  onCellClick?: (rowIndex: number, colIndex: number) => void;
}

export function SimilarityMatrix({ matrix, onCellClick }: SimilarityMatrixProps) {
  if (matrix.labels.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Матрица сходства</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <TooltipProvider>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-xs font-semibold text-muted-foreground"></th>
                  {matrix.labels.map((label) => (
                    <th key={label} className="p-2 text-xs font-semibold text-primary">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.labels.map((rowLabel, rowIndex) => (
                  <tr key={rowLabel}>
                    <td className="p-2 text-xs font-semibold text-primary">
                      {rowLabel}
                    </td>
                    {matrix.labels.map((colLabel, colIndex) => {
                      const value = matrix.values[rowIndex][colIndex];
                      const isDiagonal = rowIndex === colIndex;
                      const bgColor = isDiagonal ? '#374151' : getSimilarityColor(value);
                      
                      return (
                        <Tooltip key={colLabel}>
                          <TooltipTrigger asChild>
                            <td
                              className="p-2 text-center text-xs font-mono cursor-pointer hover:opacity-80 transition-opacity"
                              style={{ backgroundColor: bgColor, color: '#ffffff' }}
                              onClick={() => onCellClick?.(rowIndex, colIndex)}
                            >
                              {value.toFixed(2)}
                            </td>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <div className="space-y-1">
                              <div className="font-semibold">{rowLabel} ↔ {colLabel}</div>
                              <div className="text-xs text-muted-foreground">
                                {matrix.phrases[rowIndex].text}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {matrix.phrases[colIndex].text}
                              </div>
                              <div className="text-xs font-semibold mt-2">
                                Сходство: {value.toFixed(4)}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </TooltipProvider>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-xs">
          <span className="text-muted-foreground">Низкое</span>
          <div className="flex gap-1">
            <div className="w-6 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
            <div className="w-6 h-4 rounded" style={{ backgroundColor: '#8b5cf6' }}></div>
            <div className="w-6 h-4 rounded" style={{ backgroundColor: '#f97316' }}></div>
            <div className="w-6 h-4 rounded" style={{ backgroundColor: '#ef4444' }}></div>
            <div className="w-6 h-4 rounded" style={{ backgroundColor: '#dc2626' }}></div>
          </div>
          <span className="text-muted-foreground">Высокое</span>
        </div>
      </CardContent>
    </Card>
  );
}
