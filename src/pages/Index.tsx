import { Activity, Heart, Droplet, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { AddMeasurementForm } from "@/components/AddMeasurementForm";
import { useMeasurements } from "@/contexts/MeasurementContext";
import { calculateStats, getBloodPressureStatus, getGlucoseStatus } from "@/lib/measurementUtils";

const Index = () => {
  const { measurements, addMeasurement } = useMeasurements();

  const stats = calculateStats(measurements);
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
          <p className="text-muted-foreground">Acompanhe suas medições de glicemia e pressão arterial</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Última Glicemia"
            value={lastMeasurement ? `${lastMeasurement.glucose} mg/dL` : "-"}
            subtitle={`Média: ${stats.avgGlucose} mg/dL`}
            icon={Droplet}
            status={glucoseStatus ? { label: glucoseStatus.status, variant: glucoseStatus.variant } : undefined}
          />
          <MetricCard
            title="Última Pressão Arterial"
            value={lastMeasurement ? `${lastMeasurement.systolic}/${lastMeasurement.diastolic}` : "-"}
            subtitle={`Média: ${stats.avgSystolic}/${stats.avgDiastolic} mmHg`}
            icon={Activity}
            status={bpStatus ? { label: bpStatus.status, variant: bpStatus.variant } : undefined}
          />
          <MetricCard
            title="Último Pulso"
            value={lastMeasurement ? `${lastMeasurement.pulse} bpm` : "-"}
            subtitle={`Média: ${stats.avgPulse} bpm`}
            icon={Heart}
          />
          <MetricCard
            title="Total de Medições"
            value={measurements.length.toString()}
            subtitle="Registros no histórico"
            icon={TrendingUp}
          />
        </div>

        <AddMeasurementForm onAdd={addMeasurement} />
      </div>
    </div>
  );
};

export default Index;
