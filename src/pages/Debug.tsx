import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Esta é uma página de laboratório de testes.
 * Use-a para testar funções e ver logs no console.
 */
const DebugPage = () => {

  // Roda os testes assim que a página carregar
  useEffect(() => {
    // console.clear(); // <-- REMOVIDO: Esta linha foi removida para evitar limpar o console.
    
    console.log("--- INICIANDO TESTE DE FUSO HORÁRIO (DEBUG) ---");

    const agora = new Date();
    
    // O PROBLEMA:
    console.log("1. Data Local (Seu PC):", agora.toString());
    console.log("2. Data UTC (ISOString):", agora.toISOString());
    console.log("3. O BUG (Data do ISOString):", agora.toISOString().split('T')[0]);

    // A SOLUÇÃO (Formato YYYY-MM-DD Local):
    // O locale 'sv-SE' (Sueco) convenientemente usa o formato YYYY-MM-DD
    // mas respeitando o fuso horário local.
    const dataLocalCorreta = new Date().toLocaleDateString('sv-SE');
    console.log("4. A SOLUÇÃO (Data Local YYYY-MM-DD):", dataLocalCorreta);

    console.log("--- FIM DO TESTE ---");

  }, []); // O array vazio [] garante que rode só uma vez

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Página de Debug (Testes)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium">
            Abra o Console do Desenvolvedor (F12) para ver os logs.
          </p>
          <p className="text-muted-foreground mt-2">
            Esta página está testando o bug de fuso horário que você encontrou.
            Você deve ver o log "O BUG" mostrando dia 17, e "A SOLUÇÃO" mostrando dia 16.
          </p>
          <p className="text-destructive font-bold mt-4">
            Se o console estiver vazio, verifique os filtros de 'Nível' e de 'Contexto' (mude de 'api/usuarios' para 'top').
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebugPage;