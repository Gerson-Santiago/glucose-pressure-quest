// src/services/supabase.ts

import { createClient } from "@supabase/supabase-js";

// -------------------------------------------------------
// Configuração do Supabase
// -------------------------------------------------------
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseUrl = "https://iyoayhnhzgnleodoejgy.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// -------------------------------------------------------
// Tipagem completa da tabela measurements
// -------------------------------------------------------
export interface ApiMeasurement {
    id: number;
    date: string;
    time: string;
    systolic: number | null;
    diastolic: number | null;
    glucose: number | null;
    pulse: number | null;

    // Controle de origem
    source: string | null;

    // Soft delete
    deleted_at: string | null;
    deleted_by_source: string | null;
}

export interface ApiResponse {
    success: boolean;
    error?: string;
    id?: number;
    deletedId?: number;
}

// -------------------------------------------------------
// GET — obtém todas medições não deletadas
// -------------------------------------------------------
export async function getMeasurements(): Promise<ApiMeasurement[]> {
    const { data, error } = await supabase
        .from("measurements")
        .select("*")
        .is("deleted_at", null)
        .order("date", { ascending: true })
        .order("time", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
}

// -------------------------------------------------------
// POST — adiciona medição
// `measurement` NÃO deve ter os campos id, deleted_*, source
// SEMPRE define `source = "web"`
// -------------------------------------------------------
export async function addMeasurement(
    measurement: Omit<ApiMeasurement, "id" | "deleted_at" | "deleted_by_source" | "source">
): Promise<ApiResponse> {
    const { data, error } = await supabase
        .from("measurements")
        .insert([
            {
                ...measurement,
                source: "web",
            }
        ])
        .select()
        .single();

    if (error) throw new Error(error.message);

    return {
        success: true,
        id: data.id,
    };
}

// -------------------------------------------------------
// SOFT DELETE — marca deleted_at e deleted_by_source = "web"
// -------------------------------------------------------
export async function deleteMeasurement(id: number): Promise<ApiResponse> {
    const { error } = await supabase
        .from("measurements")
        .update({
            deleted_at: new Date().toISOString(),
            deleted_by_source: "web",
        })
        .eq("id", id);

    if (error) throw new Error(error.message);

    return { success: true, deletedId: id };
}
