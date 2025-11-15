import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// MUDANÇA 1: Adicionar a interface para o 'process.env'
export default defineConfig(({ mode }) => {
  // MUDANÇA 2: Define o caminho base de forma variável
  // Usa a variável de ambiente VITE_APP_BASE_PATH (que vamos configurar no package.json)
  // Se não estiver em produção, ou a variável não estiver setada, usa o caminho raiz ('/')
  const basePath = mode === 'production' && process.env.VITE_APP_BASE_PATH
    ? process.env.VITE_APP_BASE_PATH 
    : '/';

  return {
    // MUDANÇA 3: APLICA O BASE (Corrige a tela branca e o carregamento de assets)
    base: basePath,

    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
});