import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true,
    port: 5173,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTest.js",

    exclude: [
      "node_modules/**",
      "dist/**",
      "index.html",
      "vite.config.{js,ts,mjs,cjs}",
      ".eslintrc.{js,cjs}",
      "frontend/html/**",
      "src/main.jsx",
      "src/setupTest.js",
      "src/context/**",
      "src/store.js",
      "src/*slice.js",
      "src/utils/**",
      "**/index.*",
      "**/*.d.ts",
      "**/vite.config.js.timestamp-*.mjs", 
      "html/assets/**", 
    ],

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],

      exclude: [
        "node_modules/**",
        "dist/**",
        "index.html",
        "vite.config.{js,ts,mjs,cjs}",
        ".eslintrc.{js,cjs}",
        "frontend/html/**",
        "src/main.jsx",
        "src/setupTest.js",
        "src/context/**",
        "src/store.js",
        "src/*slice.js",
        "src/utils/**",
        "**/index.*",
        "**/*.d.ts",
        "**/vite.config.js.timestamp-*.mjs", 
        "html/assets/**", 
      ],
    },
  },
});