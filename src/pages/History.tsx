// src/pages/History.tsx

/**
 * Página que lista todas as medições do usuário.
 * Permite visualizar histórico por ordem cronológica.
 */

import { useMeasurements } from "@/contexts/MeasurementContext";

const History = () => {
  const { measurements } = useMeasurements();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="text-3xl font-bold mb-6">Histórico Completo</h2>

      <ul className="space-y-4">
        {measurements.map((m) => (
          <li key={m.id} className="p-4 border rounded-lg">
            <p><strong>Data:</strong> {m.date}</p>
            <p><strong>Hora:</strong> {m.time}</p>
            <p><strong>Glicemia:</strong> {m.glucose} mg/dL</p>
            <p><strong>Pressão:</strong> {m.systolic}/{m.diastolic}</p>
            <p><strong>Pulso:</strong> {m.pulse} bpm</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
