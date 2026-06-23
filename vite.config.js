import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl"; // 1. استدعاء البلجن

export default defineConfig({
  plugins: [
    react(),
    basicSsl(), // 2. تفعيل الـ HTTPS
  ],
});
