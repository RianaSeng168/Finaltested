import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves a project page from a sub-path
  // (https://<user>.github.io/<repo>/), so every asset URL Vite
  // generates needs that repo name prefixed. Only apply this
  // during production builds — not in local dev, where it breaks
  // root-relative paths like /images/logo.png.
  base: command === "build" ? "/Finaltest/" : "/",
  server: {
    port: 5173,
  },
}));