// src/contexts/MeasurementContext.tsx

/**
 * Contexto global responsável por:
 * - carregar medições do Supabase
 * - adicionar novas medições
 * - soft delete
 * - manter estado sincronizado com Supabase
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import {
  ApiMeasurement,
  getMeasurements,
  addMeasurement as addRemote,
  deleteMeasurement as deleteRemote,
  ApiResponse,
} from "@/services/supabase";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { mapApiMeasurements } from "@/lib/measurementUtils";
import { Measurement as FrontMeasurement } from "@/types/measurement";


// -------------------------------------------------------
// Tipagem do Provider
// -------------------------------------------------------

interface MeasurementContextType {
  measurements: FrontMeasurement[];
  addMeasurement: (m: Omit<FrontMeasurement, "id">) => Promise<void>;
  deleteMeasurement: (id: number) => Promise<void>;
}

const MeasurementContext = createContext<MeasurementContextType | undefined>(
  undefined
);


// -------------------------------------------------------
// Provider principal
// -------------------------------------------------------

export const MeasurementProvider = ({ children }: { children: ReactNode }) => {
  const [measurements, setMeasurements] = useState<FrontMeasurement[]>([]);

  /**
   * Carrega medições assim que o app é iniciado.
   */
  useEffect(() => {
    (async () => {
      try {
        const data: ApiMeasurement[] = await getMeasurements();
        setMeasurements(mapApiMeasurements(data));
      } catch (err) {
        console.error("Erro ao carregar medições:", err);
        toast.error("Falha ao carregar medições do servidor.");
      }
    })();
  }, []);

  // -------------------------------------------------------
  // Adicionar medição
  // -------------------------------------------------------

  const addMeasurement = async (
    newMeasurement: Omit<FrontMeasurement, "id">
  ) => {
    try {
      const payload = {
        ...newMeasurement,
        deleted_at: null,
        deleted_by_source: null,
      };

      const res: ApiResponse = await addRemote(payload);

      if (res?.success) {
        toast.success("Medição salva!");
        const updated = await getMeasurements();
        setMeasurements(mapApiMeasurements(updated));
      } else {
        toast.error(res.error || "Erro ao salvar medição.");
      }
    } catch (err) {
      console.error("Erro ao salvar medição:", err);
      toast.error("Falha ao conectar à API.");
    }
  };

  // -------------------------------------------------------
  // Soft delete
  // -------------------------------------------------------

  const deleteMeasurement = async (id: number) => {
    const deletedMeasurement = measurements.find((m) => m.id === id);
    if (!deletedMeasurement) return;

    setMeasurements(measurements.filter((m) => m.id !== id));

    toast("Medição removida", {
      description: "Removida do histórico local.",
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setMeasurements((prev) =>
              [...prev, deletedMeasurement].sort((a, b) => a.id! - b.id!)
            );
            toast.info("Medição restaurada.");
          }}
        >
          Desfazer
        </Button>
      ),
    });

    try {
      const res = await deleteRemote(id);

      if (!res?.success) {
        toast.error(res.error || "Erro no servidor.");
        setMeasurements((prev) =>
          [...prev, deletedMeasurement].sort((a, b) => a.id! - b.id!)
        );
      }
    } catch (err) {
      console.error("Erro ao excluir:", err);
      toast.error("Falha de conexão ao excluir.");
      setMeasurements((prev) =>
        [...prev, deletedMeasurement].sort((a, b) => a.id! - b.id!)
      );
    }
  };

  return (
    <MeasurementContext.Provider
      value={{ measurements, addMeasurement, deleteMeasurement }}
    >
      {children}
    </MeasurementContext.Provider>
  );
};


// -------------------------------------------------------
// Hook para acesso rápido
// -------------------------------------------------------

export const useMeasurements = () => {
  const ctx = useContext(MeasurementContext);
  if (!ctx)
    throw new Error("useMeasurements deve ser usado dentro do Provider");
  return ctx;
};
