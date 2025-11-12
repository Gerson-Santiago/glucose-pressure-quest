import { useState } from "react";
import { Activity, Heart, Droplet, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { MeasurementChart } from "@/components/MeasurementChart";
import { MeasurementTable } from "@/components/MeasurementTable";
import { AddMeasurementForm } from "@/components/AddMeasurementForm";
import { parseMeasurements, calculateStats, getBloodPressureStatus, getGlucoseStatus } from "@/lib/measurementUtils";
import { Measurement } from "@/types/measurement";

const Index = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>(parseMeasurements(""));

  const stats = calculateStats(measurements);
  const lastMeasurement = stats.lastMeasurement;

  const handleAddMeasurement = (newMeasurement: Omit<Measurement, "id">) => {
    const newId = measurements.length > 0 ? Math.max(...measurements.map(m => m.id)) + 1 : 1;
    setMeasurements([...measurements, { ...newMeasurement, id: newId }]);
  };

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
          <h1 className="text-4xl font-bold text-foreground mb-2">Monitor de Saúde</h1>
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

        <div className="mb-8">
          <AddMeasurementForm onAdd={handleAddMeasurement} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MeasurementChart measurements={measurements} type="glucose" />
          <MeasurementChart measurements={measurements} type="pressure" />
        </div>

        <MeasurementTable measurements={[...measurements].reverse()} />
      </div>
    </div>
  );
};

export default Index;
