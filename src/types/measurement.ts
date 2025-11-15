// src/types/measurement.ts

// -------------------------------------------------------
// Estrutura usada SOMENTE no frontend
// -------------------------------------------------------
export interface Measurement {
  id: number;
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  glucose: number;
  pulse: number;
}

// Estatísticas (não usa ainda)
export interface MeasurementStats {
  avgGlucose: number;
  avgSystolic: number;
  avgDiastolic: number;
  avgPulse: number;
  lastMeasurement: Measurement | null;
}
