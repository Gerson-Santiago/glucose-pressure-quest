import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/services/supabase';
// Importamos suas funções para testar
import { formatDate, formatTime, getLocalDateISO, getLocalTimeISO } from "@/lib/date";

/**
 * Página de laboratório de testes.
 */
const DebugPage = () => {
  const [logs, setLogs] = useState<string[]>([]);

  // Função auxiliar para registrar logs na tela
  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, message]);
  };

  // === SUITE DE TESTES UNITÁRIOS (SIMULADO) ===
  const runUnitTests = () => {
    addLog("--- INICIANDO TESTES UNITÁRIOS DE DATA ---");

    // 1. Teste formatDate
    const inputDate = "2025-11-18";
    const expectedDate = "18/11/2025";
    const resultDate = formatDate(inputDate);
    
    if (resultDate === expectedDate) {
      addLog(`✅ formatDate: SUCESSO (${inputDate} -> ${resultDate})`);
    } else {
      addLog(`❌ formatDate: FALHA (Esperado: ${expectedDate}, Recebido: ${resultDate})`);
    }

    // 2. Teste formatTime
    const inputTime = "21:20:00";
    const expectedTime = "21:20";
    const resultTime = formatTime(inputTime);

    if (resultTime === expectedTime) {
      addLog(`✅ formatTime: SUCESSO (${inputTime} -> ${resultTime})`);
    } else {
      addLog(`❌ formatTime: FALHA (Esperado: ${expectedTime}, Recebido: ${resultTime})`);
    }

    // 3. Teste getLocalDateISO (Formato)
    const isoDate = getLocalDateISO();
    // Regex simples para YYYY-MM-DD
    const isIsoDateValid = /^\d{4}-\d{2}-\d{2}$/.test(isoDate);
    
    if (isIsoDateValid) {
      addLog(`✅ getLocalDateISO: Formato Válido (${isoDate})`);
    } else {
      addLog(`❌ getLocalDateISO: Formato Inválido (${isoDate})`);
    }

    // 4. Teste getLocalTimeISO (Formato)
    const isoTime = getLocalTimeISO();
    // Verifica se começa com HH:MM ou HH:MM:SS
    const isIsoTimeValid = /^\d{2}:\d{2}/.test(isoTime);

    if (isIsoTimeValid) {
      addLog(`✅ getLocalTimeISO: Formato Válido (${isoTime})`);
    } else {
      addLog(`❌ getLocalTimeISO: Formato Inválido (${isoTime})`);
    }

    addLog("--- FIM DOS TESTES ---");
  };

  // Teste de Conexão Supabase (Mantido do seu código original)
  const testSupabaseConnection = async () => {
    // ... (seu código existente de conexão)
  };

  useEffect(() => {
    runUnitTests(); // Roda os testes de data
    // testSupabaseConnection(); // Pode descomentar se quiser testar o banco também
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Console de Testes (Debug)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-sm overflow-auto max-h-[500px]">
            {logs.length === 0 ? (
              <p className="text-muted-foreground">Rodando testes...</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className={`mb-1 ${log.includes('❌') ? 'text-red-400' : log.includes('✅') ? 'text-green-400' : ''}`}>
                  {log}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebugPage;