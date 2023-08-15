import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    include: ["src/__tests__/**/*.test.ts"],
    reporters: ["default", "html"],
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
