import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/__tests__/**/*.test.ts", "packages/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@packages/design-system": path.resolve(__dirname, "./packages/design-system/index.ts"),
      "@packages/content-model": path.resolve(__dirname, "./packages/content-model/index.ts"),
      "@packages/validation": path.resolve(__dirname, "./packages/validation/index.ts"),
    },
  },
});
