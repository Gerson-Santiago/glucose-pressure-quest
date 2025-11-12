// src/types/measurement.ts
export interface Measurement {
  id: number;
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  glucose: number;
  pulse: number;
}

export interface MeasurementStats {
  avgGlucose: number;
  avgSystolic: number;
  avgDiastolic: number;
  avgPulse: number;
  lastMeasurement: Measurement | null;
}
