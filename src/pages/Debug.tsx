import { useEffect, useState } from 'react';
import { runDateTests, getLocalDateISO, getLocalTimeISO } from "@/lib/date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Debug = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Sobrescreve o console.log para aparecer na tela também
    const originalLog = console.log;
    console.log = (...args) => {
      setLogs(prev => [...prev, args.join(' ')]);
      originalLog(...args);
    };

    // Executa os testes
    runDateTests();

    // Limpa a sobrescrita ao sair
    return () => {
      console.log = originalLog;
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Painel de Diagnóstico de Data/Hora</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-slate-100 rounded text-sm font-mono">
            <p><strong>Data Local do Sistema:</strong> {new Date().toString()}</p>
            <p><strong>Data ISO (getLocalDateISO):</strong> {getLocalDateISO()}</p>
            <p><strong>Hora ISO (getLocalTimeISO):</strong> {getLocalTimeISO()}</p>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-bold mb-2">Logs de Teste:</h3>
            <div className="bg-black text-green-400 p-4 rounded h-64 overflow-auto font-mono text-xs">
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Debug;