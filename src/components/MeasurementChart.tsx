import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Measurement } from "@/types/measurement";

// MUDANÇA 1: Adicionar a prop titlePrefix
interface MeasurementChartProps {
  measurements: Measurement[];
  type: "glucose" | "pressure";
  titlePrefix?: string; // NOVO: Usado para distinguir os gráficos (ex: "Glicemia")
}

export const MeasurementChart = ({ measurements, type, titlePrefix }: MeasurementChartProps) => {
  
  // A lógica de mapeamento de dados permanece a sua (corrigida)
  const data = measurements.map((m) => ({
    date: `${m.date.slice(8, 10)}-${m.date.slice(5, 7)}`, // DD-MM

    // CORREÇÃO: Acentuação correta ('Sistólica', 'Diastólica')
    ...(type === "glucose"
      ? { Glicemia: m.glucose }
      : { Sistólica: m.systolic, Diastólica: m.diastolic }),
  }));

  // MUDANÇA 2: Usar o titlePrefix no título
  let baseTitle = "";
  if (type === "glucose") {
    baseTitle = "Glicemia ao Longo do Tempo";
  } else {
    baseTitle = "Pressão Arterial ao Longo do Tempo";
  }

  // Se houver um prefixo (como "Glicemia" na seção "Tendência Geral"), use-o
  const finalTitle = titlePrefix ? `${titlePrefix} | ${baseTitle}` : baseTitle;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{finalTitle}</CardTitle>
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
                  dataKey="Sistólica" // CORRIGIDO
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Diastólica" // CORRIGIDO
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