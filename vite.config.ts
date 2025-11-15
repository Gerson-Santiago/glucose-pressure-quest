import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 1. Define o caminho base para assets (lido no build)
  // Permanece a lógica de produção vs. desenvolvimento
  const basePath = mode === 'production' && process.env.VITE_APP_BASE_PATH
    ? process.env.VITE_APP_BASE_PATH 
    : '/';

  // 2. Define o caminho de abertura do navegador (lido no dev)
  // Lê a variável do .env para usar o subdiretório no ambiente local
  const openPath = process.env.VITE_APP_BASE_PATH || '/';
  
  return {
    // 3. APLICA O BASE (Corrige a tela branca e o carregamento de assets)
    base: basePath,

    server: {
      host: "::",
      port: 8080,
      // MUDANÇA CRUCIAL: Força a abertura neste subpath.
      // O Vite carrega VITE_APP_BASE_PATH do seu arquivo .env automaticamente em modo 'dev'.
      open: openPath,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
});