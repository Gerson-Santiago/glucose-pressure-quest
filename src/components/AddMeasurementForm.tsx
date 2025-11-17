// src/components/AddMeasurementForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus } from "lucide-react";

// MUDANÇA 1: Importar as novas funções centrais de date.ts
import { getLocalDateISO, getLocalTimeISO } from "@/lib/date";

interface AddMeasurementFormProps {
  onAdd: (measurement: {
    date: string;
    time: string;
    systolic: number;
    diastolic: number;
    glucose: number;
    pulse: number;
  }) => Promise<void> | void;
}

export const AddMeasurementForm = ({ onAdd }: AddMeasurementFormProps) => {

  // MUDANÇA 2: Usar as funções importadas para o estado inicial
  const [formData, setFormData] = useState({
    date: getLocalDateISO(), // <-- Usa a função central
    time: getLocalTimeISO(), // <-- Usa a função central
    systolic: "",
    diastolic: "",
    glucose: "",
    pulse: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.systolic || !formData.diastolic || !formData.glucose || !formData.pulse) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const newMeasurement = {
      // MUDANÇA 3: Usar a função central para garantir o formato local
      date: new Date(formData.date).toLocaleDateString('sv-SE'),
      time: formData.time.length === 5 ? formData.time + ":00" : formData.time,
      systolic: parseInt(formData.systolic),
      diastolic: parseInt(formData.diastolic),
      glucose: parseInt(formData.glucose),
      pulse: parseInt(formData.pulse),
    };

    console.log("Payload enviado:", newMeasurement);

    try {
      await onAdd(newMeasurement);

      // Reseta o formulário
      setFormData({
        date: getLocalDateISO(), // <-- Usa a função central
        time: getLocalTimeISO(), // <-- Usa a função central
        systolic: "",
        diastolic: "",
        glucose: "",
        pulse: "",
      });

    } catch (error) {
      console.error("Erro ao adicionar medição:", error);
    }
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
                value={formData.time.slice(0, 5)}
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