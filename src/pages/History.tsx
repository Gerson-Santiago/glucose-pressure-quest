// src/pages/History.tsx
/**
 * Página que lista todas as medições do usuário.
 * Permite visualizar histórico e exportar para PDF.
 */

import { useMeasurements } from "@/contexts/MeasurementContext";
import { MeasurementTable } from "@/components/MeasurementTable";
import { Inbox } from "lucide-react"; // Ícone para estado vazio
import { toast } from "sonner";
// MUDANÇA 1: Importar o novo botão de PDF
import { ReportButton } from "@/components/ReportButton"; 

const History = () => {
  const { measurements, deleteMeasurement } = useMeasurements();

  // Ordena do mais novo para o mais antigo
  const sortedMeasurements = [...measurements].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}`);
    const dateTimeB = new Date(`${b.date}T${b.time}`);
    return dateTimeB.getTime() - dateTimeA.getTime();
  });

  const handleDelete = (id: number) => {
    if (deleteMeasurement) {
      deleteMeasurement(id);
      // O toast de sucesso/desfazer já é tratado no 'MeasurementContext'
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      
      {/* MUDANÇA 2: Layout do Cabeçalho atualizado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Histórico</h1>
          <p className="text-muted-foreground">
            Todos os seus registros de medições.
          </p>
        </div>
        {/* Adiciona o botão de Download aqui, só aparece se houver dados */}
        {sortedMeasurements.length > 0 && (
          // O targetId DEVE ser o mesmo do <div> abaixo
          <ReportButton targetId="tabela-historico-pdf" />
        )}
      </div>

      {sortedMeasurements.length > 0 ? (
        // MUDANÇA 3: Adicionar o ID="tabela-historico-pdf" 
        // para o botão encontrar este container.
        // Adicionamos padding para ficar bonito no PDF.
        <div id="tabela-historico-pdf" className="bg-background p-4"> 
          <MeasurementTable
            measurements={sortedMeasurements}
            onDelete={deleteMeasurement ? handleDelete : undefined}
          />
        </div>
      ) : (
        // Estado vazio (sem mudanças)
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground bg-card border rounded-lg shadow-sm">
          <Inbox className="h-16 w-16 mb-4 opacity-30" />
          <h3 className="text-xl font-semibold">Nenhum registro encontrado</h3>
          <p>Comece a adicionar medições na página Dashboard.</p>
        </div>
      )}
    </div>
  );
};

export default History;