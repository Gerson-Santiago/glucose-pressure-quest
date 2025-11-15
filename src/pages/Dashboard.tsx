// src/pages/Dashboard.tsx


// --- Imports Principais ---
import { useState } from "react";
import { Activity, Heart, Droplet, TrendingUp, BarChart3, Plus } from "lucide-react";
import { Link } from "react-router-dom";

// --- Imports de Componentes ---
import { MetricCard } from "@/components/MetricCard";
import { AddMeasurementForm } from "@/components/AddMeasurementForm";
import { MeasurementChart } from "@/components/MeasurementChart";
import { Button } from "@/components/ui/button";

// --- Imports de Lógica e Contexto ---
import { useMeasurements } from "@/contexts/MeasurementContext";
import { calculateStats, getBloodPressureStatus, getGlucoseStatus } from "@/lib/measurementUtils";

/**
 * Página principal (Dashboard) que serve como 'homepage' do aplicativo.
 * Exibe métricas, um formulário expansível e uma prévia dos gráficos.
 */
const Dashboard = () => {
  // --- Conexão com Contexto ---
  // Busca os dados e a função de adicionar do contexto global
  const { measurements, addMeasurement } = useMeasurements();

  // --- Estado Local ---
  // Controla a visibilidade (expandir/recolher) do formulário de adição
  const [showForm, setShowForm] = useState(false);

  // --- Cálculos de Estatísticas ---
  // Processa os dados brutos para exibir nos cards
  const stats = calculateStats(measurements);
  const lastMeasurement = stats.lastMeasurement;

  const bpStatus = lastMeasurement
    ? getBloodPressureStatus(lastMeasurement.systolic, lastMeasurement.diastolic)
    : null;

  const glucoseStatus = lastMeasurement
    ? getGlucoseStatus(lastMeasurement.glucose)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* === Cabeçalho da Página === */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Bem-vindo</h2>
          <p className="text-muted-foreground">
            Acompanhe suas medições de glicemia e pressão arterial
          </p>
        </div>

        {/* === Seção do Formulário Expansível === */}
        <div className="mt-10 space-y-4">
          <div className="flex items-center justify-between">

            {/* Título clicável para expandir/recolher (Melhoria de UX) */}
            <h3
              className="text-2xl font-semibold flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setShowForm(!showForm)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setShowForm(!showForm)}
            >
              <Plus className="w-6 h-6 text-primary" />
              Adicionar Medição
            </h3>

            {/* Botão principal de expandir/recolher */}
            <Button
              variant={showForm ? "destructive" : "default"}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Fechar Formulário" : "Adicionar Medição"}
            </Button>
          </div>

          {/* Renderização condicional do formulário */}
          {showForm && (
            <AddMeasurementForm onAdd={addMeasurement} />
          )}
        </div>

        {/* Espaçador */}
        <div className="mt-10"></div>

        {/* === Seção de Métricas (Cards) === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Última Glicemia"
            value={lastMeasurement ? `${lastMeasurement.glucose} mg/dL` : "-"}
            subtitle={`Média: ${stats.avgGlucose} mg/dL`}
            icon={Droplet}
            status={glucoseStatus ?? undefined}
          />
          <MetricCard
            title="Última Pressão Arterial"
            value={lastMeasurement ? `${lastMeasurement.systolic}/${lastMeasurement.diastolic}` : "-"}
            subtitle={`Média: ${stats.avgSystolic}/${stats.avgDiastolic} mmHg`}
            icon={Activity}
            status={bpStatus ?? undefined}
          />
          <MetricCard
            title="Último Pulso"
            value={lastMeasurement ? `${lastMeasurement.pulse} bpm` : "-"}
            subtitle={`Média: ${stats.avgPulse} bpm`}
            icon={Heart}
          />
          <MetricCard
            title="Total de Medições"
            value={measurements.length.toString()}
            subtitle="Registros no histórico"
            icon={TrendingUp}
          />
        </div>

        {/* === Seção de Gráficos (Prévia) === */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Resumo dos Gráficos
            </h3>
            <Link to="/charts">
              <Button variant="default">Ver gráficos completos</Button>
            </Link>
          </div>

          {/* Gráficos sempre visíveis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MeasurementChart measurements={measurements} type="glucose" />
            <MeasurementChart measurements={measurements} type="pressure" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;