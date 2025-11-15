// src/pages/Charts.tsx

/**
 * Página que exibe gráficos completos de glicemia e pressão.
 */

import { MeasurementChart } from "@/components/MeasurementChart";
import { useMeasurements } from "@/contexts/MeasurementContext";

const Charts = () => {
  const { measurements } = useMeasurements();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h2 className="text-3xl font-bold mb-6">Gráficos Completos</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MeasurementChart measurements={measurements} type="glucose" />
        <MeasurementChart measurements={measurements} type="pressure" />
      </div>
    </div>
  );
};

export default Charts;
