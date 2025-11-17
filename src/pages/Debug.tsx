import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// MUDANÇA 1: Importar o Supabase (para testar a conexão)
import { supabase } from '@/services/supabase';

/**
 * Esta é uma página de laboratório de testes.
 * Use-a para testar funções e ver logs no console.
 */
const DebugPage = () => {

  // Teste de Conexão Supabase
  const testSupabaseConnection = async () => {
    console.log("--- INICIANDO TESTE DE CONEXÃO SUPABASE ---");
    
    // Logar as variáveis de ambiente que o Vite carregou
    console.log("VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log("VITE_SUPABASE_ANON_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "Carregada (oculta)" : "NÃO CARREGADA");

    try {
      // Tenta fazer a chamada de API mais simples possível
      const { data, error } = await supabase
        .from('measurements') // O nome da sua tabela
        .select('id') // Pede só a coluna 'id'
        .limit(1);    // Pede só 1 registro

      if (error) {
        // Se a API retornar um erro (ex: RLS, chave errada)
        console.error("ERRO DA API SUPABASE:", error.message);
      } else {
        // Se funcionar
        console.log("CONEXÃO SUPABASE OK! Resposta:", data);
      }
    } catch (err) {
      // Se a rede falhar (ex: FIREWALL BLOQUEANDO)
      console.error("ERRO DE REDE/FETCH:", (err as Error).message);
    }
    console.log("--- FIM DO TESTE DE CONEXÃO ---");
  };

  // Teste de Fuso Horário (o seu teste original)
  const testTimezone = () => {
    console.log("--- INICIANDO TESTE DE FUSO HORÁRIO (DEBUG) ---");
    const agora = new Date();
    console.log("1. Data Local (Seu PC):", agora.toString());
    console.log("2. Data UTC (ISOString):", agora.toISOString());
    console.log("3. O BUG (Data do ISOString):", agora.toISOString().split('T')[0]);
    const dataLocalCorreta = new Date().toLocaleDateString('sv-SE');
    console.log("4. A SOLUÇÃO (Data Local YYYY-MM-DD):", dataLocalCorreta);
    console.log("--- FIM DO TESTE DE FUSO HORÁRIO ---");
  };

  // Roda os testes assim que a página carregar
  useEffect(() => {
    testSupabaseConnection(); // <-- MUDANÇA 2: Chamar o novo teste
    testTimezone();
  }, []);

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
            Estamos testando o **Fuso Horário** e a **Conexão com o Supabase**.
          </p>
          <p className="text-destructive font-bold mt-4">
            Verifique os logs de "CONEXÃO SUPABASE". Se você vir "ERRO DE REDE/FETCH", 
            provavelmente é um bloqueio de firewall da sua rede (SEDUC).
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebugPage;