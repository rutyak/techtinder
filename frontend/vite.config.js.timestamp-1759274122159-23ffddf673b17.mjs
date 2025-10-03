// vite.config.js
import { defineConfig } from "file:///C:/Users/rutik/OneDrive/Desktop/Acciojob%20Projects/techtinder/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/rutik/OneDrive/Desktop/Acciojob%20Projects/techtinder/frontend/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///C:/Users/rutik/OneDrive/Desktop/Acciojob%20Projects/techtinder/frontend/node_modules/@tailwindcss/vite/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true,
    port: 5173
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
      "html/assets/**"
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
        "html/assets/**"
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxydXRpa1xcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXEFjY2lvam9iIFByb2plY3RzXFxcXHRlY2h0aW5kZXJcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHJ1dGlrXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcQWNjaW9qb2IgUHJvamVjdHNcXFxcdGVjaHRpbmRlclxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcnV0aWsvT25lRHJpdmUvRGVza3RvcC9BY2Npb2pvYiUyMFByb2plY3RzL3RlY2h0aW5kZXIvZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gXCJAdGFpbHdpbmRjc3Mvdml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbdGFpbHdpbmRjc3MoKSwgcmVhY3QoKV0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IHRydWUsXG4gICAgcG9ydDogNTE3MyxcbiAgfSxcbiAgdGVzdDoge1xuICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBzZXR1cEZpbGVzOiBcIi4vc3JjL3NldHVwVGVzdC5qc1wiLFxuXG4gICAgZXhjbHVkZTogW1xuICAgICAgXCJub2RlX21vZHVsZXMvKipcIixcbiAgICAgIFwiZGlzdC8qKlwiLFxuICAgICAgXCJpbmRleC5odG1sXCIsXG4gICAgICBcInZpdGUuY29uZmlnLntqcyx0cyxtanMsY2pzfVwiLFxuICAgICAgXCIuZXNsaW50cmMue2pzLGNqc31cIixcbiAgICAgIFwiZnJvbnRlbmQvaHRtbC8qKlwiLFxuICAgICAgXCJzcmMvbWFpbi5qc3hcIixcbiAgICAgIFwic3JjL3NldHVwVGVzdC5qc1wiLFxuICAgICAgXCJzcmMvY29udGV4dC8qKlwiLFxuICAgICAgXCJzcmMvc3RvcmUuanNcIixcbiAgICAgIFwic3JjLypzbGljZS5qc1wiLFxuICAgICAgXCJzcmMvdXRpbHMvKipcIixcbiAgICAgIFwiKiovaW5kZXguKlwiLFxuICAgICAgXCIqKi8qLmQudHNcIixcbiAgICAgIFwiKiovdml0ZS5jb25maWcuanMudGltZXN0YW1wLSoubWpzXCIsIFxuICAgICAgXCJodG1sL2Fzc2V0cy8qKlwiLCBcbiAgICBdLFxuXG4gICAgY292ZXJhZ2U6IHtcbiAgICAgIHByb3ZpZGVyOiBcInY4XCIsXG4gICAgICByZXBvcnRlcjogW1widGV4dFwiLCBcImh0bWxcIl0sXG5cbiAgICAgIGV4Y2x1ZGU6IFtcbiAgICAgICAgXCJub2RlX21vZHVsZXMvKipcIixcbiAgICAgICAgXCJkaXN0LyoqXCIsXG4gICAgICAgIFwiaW5kZXguaHRtbFwiLFxuICAgICAgICBcInZpdGUuY29uZmlnLntqcyx0cyxtanMsY2pzfVwiLFxuICAgICAgICBcIi5lc2xpbnRyYy57anMsY2pzfVwiLFxuICAgICAgICBcImZyb250ZW5kL2h0bWwvKipcIixcbiAgICAgICAgXCJzcmMvbWFpbi5qc3hcIixcbiAgICAgICAgXCJzcmMvc2V0dXBUZXN0LmpzXCIsXG4gICAgICAgIFwic3JjL2NvbnRleHQvKipcIixcbiAgICAgICAgXCJzcmMvc3RvcmUuanNcIixcbiAgICAgICAgXCJzcmMvKnNsaWNlLmpzXCIsXG4gICAgICAgIFwic3JjL3V0aWxzLyoqXCIsXG4gICAgICAgIFwiKiovaW5kZXguKlwiLFxuICAgICAgICBcIioqLyouZC50c1wiLFxuICAgICAgICBcIioqL3ZpdGUuY29uZmlnLmpzLnRpbWVzdGFtcC0qLm1qc1wiLCBcbiAgICAgICAgXCJodG1sL2Fzc2V0cy8qKlwiLCBcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVosU0FBUyxvQkFBb0I7QUFDaGIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWlCO0FBRXhCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO0FBQUEsRUFDaEMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFBQSxJQUNULFlBQVk7QUFBQSxJQUVaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBRUEsVUFBVTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVSxDQUFDLFFBQVEsTUFBTTtBQUFBLE1BRXpCLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
