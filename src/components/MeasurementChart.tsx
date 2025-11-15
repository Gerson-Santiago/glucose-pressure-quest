// src/components/MeasurementChart.tsx
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Measurement } from "@/types/measurement";

interface MeasurementChartProps {
  measurements: Measurement[];
  type: "glucose" | "pressure";
}

export const MeasurementChart = ({ measurements, type }: MeasurementChartProps) => {
  const data = measurements.map((m) => ({
    date: `${m.date.slice(0, 5)}`,
    ...(type === "glucose"
      ? { Glicemia: m.glucose }
      : { Sistólica: m.systolic, Diastólica: m.diastolic }),
  }));

  const title = type === "glucose" ? "Glicemia ao Longo do Tempo" : "Pressão Arterial ao Longo do Tempo";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            {type === "glucose" ? (
              <Line
                type="monotone"
                dataKey="Glicemia"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
              />
            ) : (
              <>
                <Line
                  type="monotone"
                  dataKey="Sistólica"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Diastólica"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-3))", r: 4 }}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
