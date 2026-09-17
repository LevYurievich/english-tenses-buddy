// Static SPA build for GitHub Pages (https://levyurievich.github.io/english-tenses-buddy/).
// The regular `vite.config.ts` (TanStack Start) is untouched and still used by Lovable.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";
import { copyFileSync } from "node:fs";
import path from "node:path";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(rootDir, "dist");

export default defineConfig({
  base: "/english-tenses-buddy/",
  root: path.resolve(rootDir, "pages"),
  publicDir: path.resolve(rootDir, "public"),
  resolve: {
    alias: { "@": path.resolve(rootDir, "src") },
  },
  plugins: [
    react(),
    tailwindcss(),
    tsConfigPaths(),
    {
      // GitHub Pages has no SPA fallback: serve index.html for unknown paths via 404.html
      name: "spa-404-fallback",
      closeBundle() {
        copyFileSync(path.join(outDir, "index.html"), path.join(outDir, "404.html"));
      },
    },
  ],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(rootDir, "pages/index.html"),
    },
  },
});
