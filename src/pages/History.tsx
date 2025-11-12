// src/pages/History.tsx
import { MeasurementTable } from "@/components/MeasurementTable";
import { useMeasurements } from "@/contexts/MeasurementContext";
import { mapApiMeasurements } from "@/lib/measurementUtils";

const History = () => {
  const { measurements, deleteMeasurement } = useMeasurements();

  // ✅ converte os dados da API para o tipo esperado pelo front
  const frontMeasurements = mapApiMeasurements(measurements);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Histórico</h2>
          <p className="text-muted-foreground">Todos os seus registros de medições</p>
        </div>

        <MeasurementTable 
          measurements={[...frontMeasurements].reverse()} 
          onDelete={deleteMeasurement}
        />
      </div>
    </div>
  );
};

export default History;
