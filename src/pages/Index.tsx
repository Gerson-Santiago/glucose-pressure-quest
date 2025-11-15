// src/pages/Index.tsx
import { useState } from "react";
import { Activity, Heart, Droplet, TrendingUp, BarChart3 } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { AddMeasurementForm } from "@/components/AddMeasurementForm";
import { MeasurementChart } from "@/components/MeasurementChart";
import { useMeasurements } from "@/contexts/MeasurementContext";
import { calculateStats, getBloodPressureStatus, getGlucoseStatus } from "@/lib/measurementUtils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const { measurements, addMeasurement } = useMeasurements();
  const [showCharts, setShowCharts] = useState(false);

  const frontMeasurements = measurements;

  const stats = calculateStats(frontMeasurements);
  const lastMeasurement = stats.lastMeasurement;

  const bpStatus = lastMeasurement
    ? getBloodPressureStatus(lastMeasurement.systolic, lastMeasurement.diastolic)
    : null;

  const glucoseStatus = lastMeasurement
    ? getGlucoseStatus(lastMeasurement.glucose)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Bem-vindo</h2>
          <p className="text-muted-foreground">
            Acompanhe suas medições de glicemia e pressão arterial
          </p>
        </div>

        {/* Cards principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Última Glicemia"
            value={lastMeasurement ? `${lastMeasurement.glucose} mg/dL` : "-"}
            subtitle={`Média: ${stats.avgGlucose} mg/dL`}
            icon={Droplet}
            status={glucoseStatus ?? undefined}
          />
          <MetricCard
            title="Última Pressão Arterial"
            value={lastMeasurement ? `${lastMeasurement.systolic}/${lastMeasurement.diastolic}` : "-"}
            subtitle={`Média: ${stats.avgSystolic}/${stats.avgDiastolic} mmHg`}
            icon={Activity}
            status={bpStatus ?? undefined}
          />
          <MetricCard
            title="Último Pulso"
            value={lastMeasurement ? `${lastMeasurement.pulse} bpm` : "-"}
            subtitle={`Média: ${stats.avgPulse} bpm`}
            icon={Heart}
          />
          <MetricCard
            title="Total de Medições"
            value={frontMeasurements.length.toString()}
            subtitle="Registros no histórico"
            icon={TrendingUp}
          />
        </div>

        {/* Formulário de adição */}
        <AddMeasurementForm onAdd={addMeasurement} />

        {/* Linha “Veja os gráficos” */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Veja os Gráficos
            </h3>
            <Button
              variant="outline"
              onClick={() => setShowCharts(!showCharts)}
            >
              {showCharts ? "Recolher" : "Expandir"}
            </Button>
          </div>

          {showCharts && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
              <MeasurementChart measurements={frontMeasurements} type="glucose" />
              <MeasurementChart measurements={frontMeasurements} type="pressure" />
            </div>
          )}

          <div className="text-center mt-4">
            <Link to="/charts">
              <Button variant="default">Ver gráficos completos</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;