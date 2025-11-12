// src/pages/Charts.tsx
import { mapApiMeasurements } from "@/lib/measurementUtils";
import { getMeasurements } from "@/services/api";
import { useEffect, useState } from "react";
import { MeasurementChart } from "@/components/MeasurementChart";
import { Measurement as FrontMeasurement } from "@/types/measurement";

export default function Charts() {
  const [measurements, setMeasurements] = useState<FrontMeasurement[]>([]);

  useEffect(() => {
    (async () => {
      const apiData = await getMeasurements();       // retorna Measurement[] da API
      const mapped = mapApiMeasurements(apiData);    // transforma para FrontMeasurement[]
      setMeasurements(mapped);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <MeasurementChart measurements={measurements} type="glucose" />
      <MeasurementChart measurements={measurements} type="pressure" />
    </div>
  );
}
