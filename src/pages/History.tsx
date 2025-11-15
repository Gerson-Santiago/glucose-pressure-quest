// src/pages/History.tsx

/**
 * Página que lista todas as medições do usuário.
 * Permite visualizar histórico por ordem cronológica.
 * (Corrigi a acentuação nos comentários)
 */

import { useMeasurements } from "@/contexts/MeasurementContext";
// 1. IMPORTAR o componente da tabela que você já tem
import { MeasurementTable } from "@/components/MeasurementTable";
// 2. IMPORTAR o toast para dar feedback
import { toast } from "sonner";

// O nome do componente continua "History", como você pediu
const History = () => {
  // 3. PUXAR também a função de deletar do seu contexto
  const { measurements, deleteMeasurement } = useMeasurements();

  // 4. Ordenar para mostrar os mais novos primeiro
  const sortedMeasurements = [...measurements].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}`);
    const dateTimeB = new Date(`${b.date}T${b.time}`);
    return dateTimeB.getTime() - dateTimeA.getTime();
  });

  // 5. Criar a função que será chamada pelo botão de lixeira
  const handleDelete = (id: number) => {
    // Verifica se a função existe antes de chamar
    if (deleteMeasurement) {
      deleteMeasurement(id);
      toast.success("Medição removida.");
    }
  };

  return (
    // 6. Mudei o 'max-w-4xl' para 'max-w-6xl'
    // para a tabela ter mais espaço, como na sua Imagem 1.
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      
      {/* 7. Corrigi a acentuação e usei os*/}
      <h1 className="text-3xl font-bold mb-2">Histórico</h1>
      <p className="text-muted-foreground mb-6">
        Todos os seus registros de medições
      </p>

      {/* 8. [A MUDANÇA PRINCIPAL] Substituímos o <ul> e o .map()
          pelo componente da Tabela. */}
      <MeasurementTable
        measurements={sortedMeasurements}
        // Passa a função de deletar para a tabela
        onDelete={deleteMeasurement ? handleDelete : undefined}
      />
    </div>
  );
};

// O export default continua "History"
export default History;