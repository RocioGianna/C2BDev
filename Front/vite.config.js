import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: { open: true },
    define: { ENV2B_BACKEND_URL: '"http://localhost:8080"' },
});
