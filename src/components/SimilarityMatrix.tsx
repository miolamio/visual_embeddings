import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-xs font-semibold text-muted-foreground" />
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
                    const tooltipText = `${rowLabel} ↔ ${colLabel}: ${value.toFixed(4)}\n${matrix.phrases[rowIndex].text}\n${matrix.phrases[colIndex].text}`;
                    
                    return (
                      <td
                        key={colLabel}
                        className="p-2 text-center text-xs font-mono cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: bgColor, color: '#ffffff' }}
                        onClick={() => onCellClick?.(rowIndex, colIndex)}
                        title={tooltipText}
                      >
                        {value.toFixed(2)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-xs">
          <span className="text-muted-foreground">Низкое</span>
          <div className="flex gap-0.5">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#1e3a8a' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#1d4ed8' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#2563eb' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#3b82f6' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#4f46e5' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#6366f1' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#7c3aed' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#8b5cf6' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#9333ea' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#a855f7' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#fbbf24' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#fb923c' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#f97316' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#f87171' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#ef4444' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#dc2626' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#b91c1c' }} />
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#991b1b' }} />
          </div>
          <span className="text-muted-foreground">Высокое</span>
        </div>
      </CardContent>
    </Card>
  );
}
