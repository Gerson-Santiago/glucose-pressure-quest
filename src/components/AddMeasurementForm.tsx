// src/components/AddMeasurementForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { getLocalDateISO, getLocalTimeISO } from "@/lib/date";

interface AddMeasurementFormProps {
  onAdd: (measurement: {
    date: string;
    time: string;
    systolic: number;
    diastolic: number;
    pulse: number;
    glucose: number;
  }) => Promise<void> | void;
}

export const AddMeasurementForm = ({ onAdd }: AddMeasurementFormProps) => {
  const [formData, setFormData] = useState({
    date: getLocalDateISO(),
    time: getLocalTimeISO(),
    systolic: "",
    diastolic: "",
    pulse: "",
    glucose: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.systolic || !formData.diastolic || !formData.glucose || !formData.pulse) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const newMeasurement = {
      date: formData.date,
      time: formData.time.length === 5 ? formData.time + ":00" : formData.time,
      systolic: parseInt(formData.systolic),
      diastolic: parseInt(formData.diastolic),
      pulse: parseInt(formData.pulse),
      glucose: parseInt(formData.glucose),
    };

    try {
      await onAdd(newMeasurement);
      setFormData({
        date: getLocalDateISO(),
        time: getLocalTimeISO(),
        systolic: "",
        diastolic: "",
        pulse: "",
        glucose: "",
      });
    } catch (error) {
      console.error("Erro ao adicionar medição:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Plus className="w-6 h-6" />
          Nova Medição
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ordem solicitada: Data → Hora → Sis → Dia → Pulso → Gli */}

          <div className="space-y-2">
            <Label htmlFor="date" className="text-lg">Data</Label>
            <Input
              id="date"
              type="date"
              className="text-2xl h-14"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-lg">Hora</Label>
            <Input
              id="time"
              type="time"
              className="text-2xl h-14"
              value={formData.time.slice(0, 5)}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="systolic" className="text-lg">Pressão Sistólica (mmHg)</Label>
            <Input
              id="systolic"
              type="number"
              className="text-2xl h-14"
              value={formData.systolic}
              onChange={(e) => setFormData({ ...formData, systolic: e.target.value })}
              placeholder="Ex: 120"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="diastolic" className="text-lg">Pressão Diastólica (mmHg)</Label>
            <Input
              id="diastolic"
              type="number"
              className="text-2xl h-14"
              value={formData.diastolic}
              onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })}
              placeholder="Ex: 80"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pulse" className="text-lg">Pulso (bpm)</Label>
            <Input
              id="pulse"
              type="number"
              className="text-2xl h-14"
              value={formData.pulse}
              onChange={(e) => setFormData({ ...formData, pulse: e.target.value })}
              placeholder="Ex: 72"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="glucose" className="text-lg">Glicemia (mg/dL)</Label>
            <Input
              id="glucose"
              type="number"
              className="text-2xl h-14"
              value={formData.glucose}
              onChange={(e) => setFormData({ ...formData, glucose: e.target.value })}
              placeholder="Ex: 95"
            />
          </div>

          <Button type="submit" className="w-full text-lg h-12">
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Medição
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
