// src/lib/measurementUtils.ts

/**
 * Tipagem das medições vindas do Supabase.
 * (importada do serviço supabase)
 */
import { ApiMeasurement } from "@/services/supabase";

/**
 * Tipagem utilizada no frontend.
 */
import { Measurement as FrontMeasurement } from "@/types/measurement";


// -------------------------------------------------------
// Helpers
// -------------------------------------------------------

/**
 * Garante que valores numéricos nulos retornem 0.
 * Isso evita que o frontend quebre com undefined ou null.
 */
function safeNumber(value: number | null): number {
  return value ?? 0;
}


// -------------------------------------------------------
// Conversão Supabase → Frontend
// -------------------------------------------------------

/**
 * Converte uma lista de ApiMeasurement (Supabase)
 * para Measurement (tipagem interna do app).
 */
export function mapApiMeasurements(apiList: ApiMeasurement[]): FrontMeasurement[] {
  return apiList.map((m) => ({
    id: m.id,
    date: m.date,
    time: m.time,
    systolic: safeNumber(m.systolic),
    diastolic: safeNumber(m.diastolic),
    glucose: safeNumber(m.glucose),
    pulse: safeNumber(m.pulse),
  }));
}


// -------------------------------------------------------
// Estatísticas das medições
// -------------------------------------------------------

/**
 * Calcula estatísticas básicas das medições:
 * última medição, médias, etc.
 */
export function calculateStats(list: FrontMeasurement[]) {
  if (list.length === 0) {
    return {
      lastMeasurement: null,
      avgGlucose: 0,
      avgSystolic: 0,
      avgDiastolic: 0,
      avgPulse: 0,
    };
  }

  const lastMeasurement = list[list.length - 1];

  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

  return {
    lastMeasurement,
    avgGlucose: Math.round(avg(list.map((m) => m.glucose))),
    avgSystolic: Math.round(avg(list.map((m) => m.systolic))),
    avgDiastolic: Math.round(avg(list.map((m) => m.diastolic))),
    avgPulse: Math.round(avg(list.map((m) => m.pulse))),
  };
}

export type StatusVariant = "success" | "warning" | "destructive";

export interface MeasurementStatus {
  label: string;
  variant: StatusVariant;
}

// -------------------------------------------------------
// Status da pressão arterial
// -------------------------------------------------------

/**
 * Retorna classificação da pressão arterial
 * e um "variant" para estilizar visualmente.
 */
export function getBloodPressureStatus(
  systolic: number,
  diastolic: number
): MeasurementStatus {

  if (systolic < 120 && diastolic < 80) {
    return { label: "Normal", variant: "success" };
  }

  if (systolic < 130 && diastolic < 80) {
    return { label: "Elevada", variant: "warning" };
  }

  if (systolic < 140 || diastolic < 90) {
    return { label: "Hipertensão Estágio 1", variant: "warning" };
  }

  return { label: "Hipertensão Estágio 2", variant: "destructive" };
}



// -------------------------------------------------------
// Status da glicemia
// -------------------------------------------------------

/**
 * Retorna classificação da glicemia
 * e um "variant" para estilizar visualmente.
 */
export function getGlucoseStatus(glucose: number): MeasurementStatus {
  if (glucose < 70) {
    return { label: "Hipoglicemia", variant: "destructive" };
  }

  if (glucose <= 99) {
    return { label: "Normal", variant: "success" };
  }

  if (glucose <= 125) {
    return { label: "Pré-diabetes", variant: "warning" };
  }

  return { label: "Diabetes", variant: "destructive" };
}

