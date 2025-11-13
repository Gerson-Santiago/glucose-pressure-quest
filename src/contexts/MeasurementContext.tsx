// src/contexts/MeasurementContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Measurement as ApiMeasurement,
  getMeasurements,
  addMeasurement as addRemote,
  deleteMeasurement as deleteRemote,
  ApiResponse,
} from "@/services/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { mapApiMeasurements } from "@/lib/measurementUtils";
import { Measurement as FrontMeasurement } from "@/types/measurement";

interface MeasurementContextType {
  measurements: FrontMeasurement[];
  addMeasurement: (measurement: Omit<FrontMeasurement, "id">) => Promise<void>;
  deleteMeasurement: (id: number) => Promise<void>;
}

const MeasurementContext = createContext<MeasurementContextType | undefined>(undefined);

export const MeasurementProvider = ({ children }: { children: ReactNode }) => {
  const [measurements, setMeasurements] = useState<FrontMeasurement[]>([]);

  // 🔄 Carrega medições da API (GET)
  useEffect(() => {
    (async () => {
      try {
        const data: ApiMeasurement[] = await getMeasurements();
        setMeasurements(mapApiMeasurements(data));
      } catch (err) {
        console.error("Erro ao buscar medições:", err);
        toast.error("Não foi possível conectar à planilha Google.");
      }
    })();
  }, []);

  // ➕ Adiciona nova medição (POST)
  const addMeasurement = async (newMeasurement: Omit<FrontMeasurement, "id">): Promise<void> => {
    try {
      console.log("Enviando medição:", newMeasurement);

      const res: ApiResponse = await addRemote(newMeasurement);

      console.log("Resposta da API:", res);

      if (res?.success) {
        toast.success("Medição salva com sucesso!");

        // Atualiza lista local pegando dados da API
        const updated: ApiMeasurement[] = await getMeasurements();
        setMeasurements(mapApiMeasurements(updated));
      } else {
        toast.error(res.error || "Falha ao adicionar medição.");
      }
    } catch (err) {
      console.error("Erro ao adicionar medição:", err);
      toast.error("Erro ao conectar à API de medições.");
    }
  };

  // 🗑️ Exclui medição (DELETE via POST)
  const deleteMeasurement = async (id: number): Promise<void> => {
    const deletedMeasurement = measurements.find(m => m.id === id);
    if (!deletedMeasurement) return;

    // Remove localmente imediatamente
    setMeasurements(measurements.filter(m => m.id !== id));

    toast("Medição excluída", {
      description: "Removida do histórico local.",
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setMeasurements(prev =>
              [...prev, deletedMeasurement].sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
            );
            toast.info("Medição restaurada localmente (não reenviada à planilha).");
          }}
        >
          Desfazer
        </Button>
      ),
    });

    try {
      const res: ApiResponse = await deleteRemote(id);
      console.log("Resposta do DELETE:", res);

      if (!res?.success) {
        toast.error(res.error || "Erro ao excluir da planilha.");
        // Reverte exclusão local se falhar
        setMeasurements(prev =>
          [...prev, deletedMeasurement].sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
        );
      }
    } catch (err) {
      console.error("Erro ao deletar medição:", err);
      toast.error("Falha de conexão ao excluir medição.");
      setMeasurements(prev =>
        [...prev, deletedMeasurement].sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
      );
    }
  };

  return (
    <MeasurementContext.Provider value={{ measurements, addMeasurement, deleteMeasurement }}>
      {children}
    </MeasurementContext.Provider>
  );
};

// Hook para uso do contexto
export const useMeasurements = () => {
  const context = useContext(MeasurementContext);
  if (!context) throw new Error("useMeasurements deve ser usado dentro de MeasurementProvider");
  return context;
};
