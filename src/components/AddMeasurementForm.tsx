// src/components/AddMeasurementForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface AddMeasurementFormProps {
  onAdd: (measurement: {
    date: string;
    time: string;
    systolic: number;
    diastolic: number;
    glucose: number;
    pulse: number;
  }) => void;
}

export const AddMeasurementForm = ({ onAdd }: AddMeasurementFormProps) => {
  // Estado do formulário
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    time: new Date().toTimeString().split(" ")[0], // HH:MM:SS
    systolic: "",
    diastolic: "",
    glucose: "",
    pulse: "",
  });

  // Função de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validação básica de preenchimento
    if (!formData.systolic || !formData.diastolic || !formData.glucose || !formData.pulse) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    // 🔹 Preparando payload compatível com a nova API
    const newMeasurement = {
      date: new Date(formData.date).toISOString().split("T")[0], // YYYY-MM-DD
      time: formData.time.length === 5 ? formData.time + ":00" : formData.time, // HH:MM:SS
      systolic: parseInt(formData.systolic),
      diastolic: parseInt(formData.diastolic),
      glucose: parseInt(formData.glucose),
      pulse: parseInt(formData.pulse),
    };

    console.log("Payload enviado:", newMeasurement); // Debug no console

    // Chama a função passada pelo contexto ou parent para enviar à API
    onAdd(newMeasurement);

    // Reseta o formulário para valores iniciais
    setFormData({
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().split(" ")[0],
      systolic: "",
      diastolic: "",
      glucose: "",
      pulse: "",
    });

    // Feedback visual para o usuário
    toast.success("Medição adicionada com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nova Medição
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Seção Data e Hora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <Input
                id="time"
                type="time"
                value={formData.time.slice(0, 5)} // mantém apenas HH:MM
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          {/* Seção Pressão */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systolic">Pressão Sistólica (mmHg)</Label>
              <Input
                id="systolic"
                type="number"
                value={formData.systolic}
                onChange={(e) => setFormData({ ...formData, systolic: e.target.value })}
                placeholder="Ex: 120"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diastolic">Pressão Diastólica (mmHg)</Label>
              <Input
                id="diastolic"
                type="number"
                value={formData.diastolic}
                onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })}
                placeholder="Ex: 80"
              />
            </div>
          </div>

          {/* Seção Glicemia e Pulso */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="glucose">Glicemia (mg/dL)</Label>
              <Input
                id="glucose"
                type="number"
                value={formData.glucose}
                onChange={(e) => setFormData({ ...formData, glucose: e.target.value })}
                placeholder="Ex: 95"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pulse">Pulso (bpm)</Label>
              <Input
                id="pulse"
                type="number"
                value={formData.pulse}
                onChange={(e) => setFormData({ ...formData, pulse: e.target.value })}
                placeholder="Ex: 72"
              />
            </div>
          </div>

          {/* Botão de envio */}
          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Medição
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
