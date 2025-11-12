import { MeasurementChart } from "@/components/MeasurementChart";
import { useMeasurements } from "@/contexts/MeasurementContext";

const Charts = () => {
  const { measurements } = useMeasurements();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Gráficos</h2>
          <p className="text-muted-foreground">Visualize suas medições ao longo do tempo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MeasurementChart measurements={measurements} type="glucose" />
          <MeasurementChart measurements={measurements} type="pressure" />
        </div>
      </div>
    </div>
  );
};

export default Charts;
