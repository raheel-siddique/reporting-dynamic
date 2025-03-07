import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensure this matches the port in the debug configuration
  },
  build: {
    sourcemap: true,
  },
});
