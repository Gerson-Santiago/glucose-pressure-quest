// src/pages/AddMeasurement.tsx
import { AddMeasurementForm } from "@/components/AddMeasurementForm";
import { useMeasurements } from "@/contexts/MeasurementContext";

const AddMeasurementPage = () => {
  // 1. Buscamos a função de salvar do contexto global (Supabase)
  const { addMeasurement } = useMeasurements();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Adicionar Registro</h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para registrar uma nova medição.
        </p>
      </div>
      
      {/* 2. Renderizamos o componente do formulário passando a função */}
      <AddMeasurementForm onAdd={addMeasurement} />
    </div>
  );
};

// 3. Exportação padrão essencial para o roteador (App.tsx) funcionar
export default AddMeasurementPage;