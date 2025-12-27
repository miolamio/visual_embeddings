import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ProjectedPoint } from "../types";

interface ScatterPlotProps {
  points: ProjectedPoint[];
  onPointClick?: (point: ProjectedPoint) => void;
}

export function ScatterPlot({ points, onPointClick }: ScatterPlotProps) {
  if (points.length < 3) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground py-8">
            Добавьте минимум 3 фразы для отображения 2D проекции
          </div>
        </CardContent>
      </Card>
    );
  }

  const data = points.map(p => ({
    x: p.x,
    y: p.y,
    label: p.label,
    text: p.text,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>2D Проекция (UMAP)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" dataKey="x" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
            <YAxis type="number" dataKey="y" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-popover border border-border rounded-md p-3 shadow-lg">
                      <div className="font-semibold text-primary">{data.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{data.text}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter data={data} onClick={(data) => onPointClick?.(points[points.findIndex(p => p.label === data.label)])}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#ef4444" />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Похожие фразы расположены близко друг к другу
        </div>
      </CardContent>
    </Card>
  );
}
