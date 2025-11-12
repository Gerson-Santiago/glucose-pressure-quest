// src/lib/measurementUtils.ts
import { Measurement as ApiMeasurement } from "@/services/api";
import { Measurement as FrontMeasurement, MeasurementStats } from "@/types/measurement";

/** 🔄 Converte dados da API para o tipo usado nos componentes */
export function mapApiMeasurements(apiMeasurements: ApiMeasurement[]): FrontMeasurement[] {
  return apiMeasurements.map((m, index) => ({
    id: m.id ?? index + 1, // garante que exista id
    date: m.date,
    time: m.time,
    systolic: m.systolic,
    diastolic: m.diastolic,
    glucose: m.glucose,
    pulse: m.pulse,
  }));
}

/** 📄 Dados estáticos de exemplo */
export const parseMeasurements = (): FrontMeasurement[] => [
  { id: 1, date: "06/11/2025", time: "20:30:00", systolic: 146, diastolic: 107, glucose: 109, pulse: 74 },
  { id: 2, date: "07/11/2025", time: "05:40:00", systolic: 132, diastolic: 85, glucose: 97, pulse: 55 },
  { id: 3, date: "07/11/2025", time: "23:07:00", systolic: 155, diastolic: 94, glucose: 114, pulse: 85 },
  { id: 4, date: "08/11/2025", time: "06:26:00", systolic: 131, diastolic: 93, glucose: 93, pulse: 81 },
  { id: 5, date: "08/11/2025", time: "22:30:00", systolic: 140, diastolic: 91, glucose: 106, pulse: 72 },
  { id: 6, date: "09/11/2025", time: "07:27:00", systolic: 139, diastolic: 80, glucose: 118, pulse: 67 },
  { id: 7, date: "10/11/2025", time: "07:32:00", systolic: 125, diastolic: 83, glucose: 110, pulse: 68 },
  { id: 8, date: "10/11/2025", time: "20:52:00", systolic: 138, diastolic: 89, glucose: 132, pulse: 82 },
  { id: 9, date: "11/11/2025", time: "07:30:00", systolic: 135, diastolic: 89, glucose: 83, pulse: 61 },
  { id: 10, date: "11/11/2025", time: "21:44:00", systolic: 137, diastolic: 90, glucose: 106, pulse: 69 },
  { id: 11, date: "12/11/2025", time: "06:16:00", systolic: 137, diastolic: 98, glucose: 104, pulse: 52 },
];

/** 📊 Calcula médias e última medição */
export const calculateStats = (measurements: FrontMeasurement[]): MeasurementStats => {
  if (!measurements.length) return { avgGlucose: 0, avgSystolic: 0, avgDiastolic: 0, avgPulse: 0, lastMeasurement: null };

  const total = measurements.reduce(
    (acc, m) => ({
      glucose: acc.glucose + m.glucose,
      systolic: acc.systolic + m.systolic,
      diastolic: acc.diastolic + m.diastolic,
      pulse: acc.pulse + m.pulse,
    }),
    { glucose: 0, systolic: 0, diastolic: 0, pulse: 0 }
  );

  const count = measurements.length;

  return {
    avgGlucose: Math.round(total.glucose / count),
    avgSystolic: Math.round(total.systolic / count),
    avgDiastolic: Math.round(total.diastolic / count),
    avgPulse: Math.round(total.pulse / count),
    lastMeasurement: measurements[measurements.length - 1],
  };
};

/** 🔔 Status da glicemia */
export const getGlucoseStatus = (glucose: number) => {
  if (glucose < 70) return { status: "Baixa", variant: "warning" as const };
  if (glucose <= 99) return { status: "Normal", variant: "success" as const };
  if (glucose <= 125) return { status: "Elevada", variant: "warning" as const };
  return { status: "Alta", variant: "destructive" as const };
};

/** 🔔 Status da pressão arterial */
export const getBloodPressureStatus = (systolic: number, diastolic: number) => {
  if (systolic < 120 && diastolic < 80) return { status: "Normal", variant: "success" as const };
  if (systolic < 130 && diastolic < 80) return { status: "Elevada", variant: "warning" as const };
  if (systolic < 140 || diastolic < 90) return { status: "Hipertensão Estágio 1", variant: "warning" as const };
  return { status: "Hipertensão Estágio 2", variant: "destructive" as const };
};
