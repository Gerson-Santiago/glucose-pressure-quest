// src/pages/AddMeasurement.tsx
import { AddMeasurementForm } from "@/components/AddMeasurementForm";
import { useMeasurements } from "@/contexts/MeasurementContext";
import { useNavigate } from "react-router-dom";

/**
 * Página dedicada exclusivamente para adicionar uma nova medição.
 */
const AddMeasurementPage = () => {
  const { addMeasurement } = useMeasurements();
  const navigate = useNavigate();

  // Esta função é passada para o formulário
  const handleAddSubmit = async (measurement: any) => {
    // 1. Chama a função do contexto (que vai salvar e disparar o toast)
    try {
      await addMeasurement(measurement);
      
      // 2. Após o sucesso, navega o usuário de volta para a Dashboard
      navigate("/");

    } catch (error) {
      // O contexto já lida com o toast de erro,
      // então não precisamos fazer nada aqui,
      // apenas impedir que o 'navigate' execute.
      console.error("Falha ao adicionar, não navegar.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Reutilizamos o componente do formulário que você já criou.
        Passamos nossa função 'handleAddSubmit' para a prop 'onAdd'.
        O 'AddMeasurementForm' faz todo o trabalho de UI.
      */}
      <AddMeasurementForm onAdd={handleAddSubmit} />
    </div>
  );
};

export default AddMeasurementPage;