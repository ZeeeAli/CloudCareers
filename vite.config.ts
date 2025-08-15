import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
   server: {
      hmr: false,
   },
   base: '/',
   define: {
      __BASE_PATH__: JSON.stringify('/'),
   },
});
