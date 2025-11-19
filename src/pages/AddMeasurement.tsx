// src/pages/AddMeasurement.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { getLocalDateISO, getLocalTimeISO } from "@/lib/date";

interface AddMeasurementFormProps {
  onAdd: (measurement: any) => Promise<void> | void;
}

export const AddMeasurementForm = ({ onAdd }: AddMeasurementFormProps) => {
  const [formData, setFormData] = useState({
    date: getLocalDateISO(), // Inicia com "YYYY-MM-DD" local correto
    time: getLocalTimeISO(), // Inicia com "HH:MM" local correto
    systolic: "",
    diastolic: "",
    glucose: "",
    pulse: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.systolic || !formData.diastolic || !formData.glucose || !formData.pulse) {
      toast.error("Preencha os dados clínicos");
      return;
    }

    // PAYLOAD BLINDADO:
    // Enviamos formData.date direto. Se o input diz "2025-11-19", enviamos "2025-11-19".
    // Nenhuma conversão de 'new Date()' acontece aqui.
    const newMeasurement = {
      date: formData.date,
      time: formData.time.length === 5 ? formData.time + ":00" : formData.time,
      systolic: parseInt(formData.systolic),
      diastolic: parseInt(formData.diastolic),
      glucose: parseInt(formData.glucose),
      pulse: parseInt(formData.pulse),
    };

    console.log("Enviando (String Pura):", newMeasurement);

    try {
      await onAdd(newMeasurement);
      
      // Reset limpo
      setFormData({
        date: getLocalDateISO(),
        time: getLocalTimeISO(),
        systolic: "",
        diastolic: "",
        glucose: "",
        pulse: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" /> Nova Medição
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>
          {/* Campos numéricos mantidos iguais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systolic">Pressão Sistólica</Label>
              <Input id="systolic" type="number" placeholder="120" value={formData.systolic} onChange={(e) => setFormData({ ...formData, systolic: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diastolic">Pressão Diastólica</Label>
              <Input id="diastolic" type="number" placeholder="80" value={formData.diastolic} onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="glucose">Glicemia (mg/dL)</Label>
              <Input id="glucose" type="number" placeholder="95" value={formData.glucose} onChange={(e) => setFormData({ ...formData, glucose: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pulse">Pulso (bpm)</Label>
              <Input id="pulse" type="number" placeholder="72" value={formData.pulse} onChange={(e) => setFormData({ ...formData, pulse: e.target.value })} />
            </div>
          </div>
          <Button type="submit" className="w-full"><Plus className="w-4 h-4 mr-2" /> Adicionar</Button>
        </form>
      </CardContent>
    </Card>
  );
};