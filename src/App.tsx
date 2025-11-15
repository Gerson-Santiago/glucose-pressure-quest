// src/App.tsx <--- é minha marca registrada minha assinatura meu estilo colocar o path relativo ok?
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MeasurementProvider } from "@/contexts/MeasurementContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Navigation } from "@/components/Navigation";

// Imports das páginas atualizados
import Dashboard from "./pages/Dashboard";
import AddMeasurementPage from "./pages/AddMeasurement";
import Charts from "./pages/Charts";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Ajuda from "./pages/Ajuda";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SettingsProvider>
        <MeasurementProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <Routes>
              {/* { Rotas atualizadas} */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddMeasurementPage />} />

              <Route path="/charts" element={<Charts />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/ajuda" element={<Ajuda />} />
              {/* novas pages aqui */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MeasurementProvider>
      </SettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
