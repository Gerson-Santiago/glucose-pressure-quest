// src/pages/Charts.tsx
import { MeasurementChart } from "@/components/MeasurementChart";
import { useMeasurements } from "@/contexts/MeasurementContext";
import { Activity, Sun, Moon } from "lucide-react"; // Adicionando Sun e Moon
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/contexts/SettingsContext";

/**
 * Página que exibe gráficos completos de glicemia e pressão,
 * incluindo análises detalhadas por período do dia.
 */
const Charts = () => {
  const { measurements } = useMeasurements();

  const { showChartGuides, toggleShowChartGuides } = useSettings();

  // 1. Filtragem por Período
  // O campo 'period' já está preenchido pelo measurementUtils.ts
  const measurementsManha = measurements.filter(m => m.period === 'Manhã');
  const measurementsNoite = measurements.filter(m => m.period === 'Noite');
  
  const hasManhaData = measurementsManha.length > 0;
  const hasNoiteData = measurementsNoite.length > 0;
  const hasAnyData = measurements.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Análise de Dados</h1>
          <p className="text-muted-foreground mt-1">
            Visualização de tendência geral e comparativo por período do dia.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Label className="text-sm">Linhas guias</Label>
          <Switch
            id="toggle-guides-top"
            checked={showChartGuides}
            onCheckedChange={toggleShowChartGuides}
          />
        </div>
      </div>

      {/* Mensagem de Estado Vazio */}
      {!hasAnyData && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">Adicione medições para ver os gráficos comparativos.</p>
        </div>
      )}

      {/* === Seção 1: Tendência Geral (Os 2 Originais) === */}
      {hasAnyData && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-primary">
            <Activity className="w-6 h-6" />
            Tendência Geral (Todas as Horas)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MeasurementChart 
              measurements={measurements} 
              type="glucose" 
              titlePrefix="Glicemia"
            />
            <MeasurementChart 
              measurements={measurements} 
              type="pressure" 
              titlePrefix="Pressão Arterial"
            />
          </div>
        </div>
      )}

      {/* --- Seção 2: Análise por Manhã (Dia) --- */}
      {hasManhaData && (
        <div className="mb-10 pt-8 border-t border-border">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-yellow-500">
            <Sun className="w-6 h-6" />
            Medições da Manhã (05:00h - 11:59h)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 3º Gráfico: Glicemia da Manhã */}
            <MeasurementChart 
              measurements={measurementsManha} 
              type="glucose" 
              titlePrefix="Glicemia"
            />
            {/* 4º Gráfico: Pressão da Manhã */}
            <MeasurementChart 
              measurements={measurementsManha} 
              type="pressure" 
              titlePrefix="Pressão Arterial"
            />
          </div>
        </div>
      )}
      
      {/* --- Seção 3: Análise por Noite --- */}
      {hasNoiteData && (
        <div className="mb-10 pt-8 border-t border-border">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-blue-500">
            <Moon className="w-6 h-6" />
            Medições da Noite (12:00h - 04:59h)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 5º Gráfico: Glicemia da Noite */}
            <MeasurementChart 
              measurements={measurementsNoite} 
              type="glucose" 
              titlePrefix="Glicemia"
            />
            {/* 6º Gráfico: Pressão da Noite */}
            <MeasurementChart 
              measurements={measurementsNoite} 
              type="pressure" 
              titlePrefix="Pressão Arterial"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Charts;