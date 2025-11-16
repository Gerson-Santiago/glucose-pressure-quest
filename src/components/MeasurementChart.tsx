// src/components/MeasurementChart.tsx
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, CartesianGrid, ReferenceLine } from "recharts";
import { useSettings } from "@/contexts/SettingsContext";
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

  // Obter configurações de gráfico
  const {
    showChartGuides,
    glucoseGuideValue,
    pressureLowValue,
    pressureHighValue,
  } = useSettings();

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
            {/* Linhas de referência: glicemia / pressão (valores configuráveis no Settings) */}
            {/** Use settings to decide whether to render guide lines */}
            {showChartGuides && type === "glucose" && (
              <ReferenceLine
                y={glucoseGuideValue}
                stroke="#e11d48"
                strokeWidth={2}
                strokeDasharray="4 4"
                label={{ position: "right", value: String(glucoseGuideValue), fill: "#e11d48" }}
              />
            )}
            {showChartGuides && type === "pressure" && (
              <>
                <ReferenceLine
                  y={pressureLowValue}
                  stroke="#16a34a"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  label={{ position: "right", value: String(pressureLowValue), fill: "#16a34a" }}
                />
                <ReferenceLine
                  y={pressureHighValue}
                  stroke="#16a34a"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  label={{ position: "right", value: String(pressureHighValue), fill: "#16a34a" }}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};