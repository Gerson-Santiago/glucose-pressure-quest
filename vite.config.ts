
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
}));


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { componentTagger } from "lovable-tagger";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   // 🔹 base: "/" para dev, "/glucose-pressure-quest/" para produção (GitHub Pages)
//   base: mode === "production" ? "/glucose-pressure-quest/" : "/",
  
//   server: {
//     host: "::",
//     port: 8080,
//   },
  
//   plugins: [
//     react(),
//     mode === "development" && componentTagger(),
//   ].filter(Boolean),
  
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// }));
