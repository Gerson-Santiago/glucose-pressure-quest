import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

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
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000, // Aumenta o limite de aviso para 1000kB
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: [
              '@radix-ui/react-accordion',
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-aspect-ratio',
              '@radix-ui/react-avatar',
              '@radix-ui/react-checkbox',
              '@radix-ui/react-collapsible',
              '@radix-ui/react-context-menu',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-hover-card',
              '@radix-ui/react-label',
              '@radix-ui/react-menubar',
              '@radix-ui/react-navigation-menu',
              '@radix-ui/react-popover',
              '@radix-ui/react-progress',
              '@radix-ui/react-radio-group',
              '@radix-ui/react-scroll-area',
              '@radix-ui/react-select',
              '@radix-ui/react-separator',
              '@radix-ui/react-slider',
              '@radix-ui/react-slot',
              '@radix-ui/react-switch',
              '@radix-ui/react-tabs',
              '@radix-ui/react-toast',
              '@radix-ui/react-toggle',
              '@radix-ui/react-toggle-group',
              '@radix-ui/react-tooltip',
            ],
            charts: ['recharts'],
            supabase: ['@supabase/supabase-js'],
          },
        },
      },
    },
  }
});