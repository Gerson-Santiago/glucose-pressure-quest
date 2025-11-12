// src/services/api.ts

const API_URL = import.meta.env.VITE_API_URL as string;

export interface Measurement {
  id?: number;
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  glucose: number;
  pulse: number;
}

export interface ApiResponse {
  success: boolean;
  error?: string;
  id?: number;
  deletedId?: number;
}

// GET - retorna todas as medições
export async function getMeasurements(): Promise<Measurement[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Falha na requisição GET (${res.status})`);
  const data: Measurement[] = await res.json();
  return data;
}

// POST - adiciona uma medição
export async function addMeasurement(data: Measurement): Promise<ApiResponse> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return {
    success: !!json.success,
    error: json.error,
    id: json.id,
  };
}

// DELETE - exclui uma medição pelo ID
export async function deleteMeasurement(id: number): Promise<ApiResponse> {
  const res = await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
  const json = await res.json();
  return {
    success: !!json.success,
    error: json.error,
    deletedId: json.deletedId,
  };
}
