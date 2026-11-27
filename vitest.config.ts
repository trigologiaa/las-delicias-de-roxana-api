import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [swc.vite({ module: { type: "es6" } })],
  test: {
    passWithNoTests: true,
    projects: [
      {
        extends: true,
        test: { name: "unit", include: ["test/**/*.unit-spec.ts"] },
      },
      {
        extends: true,
        test: {
          name: "integration",
          include: ["test/**/*.integration-spec.ts"],
          fileParallelism: false,
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          include: ["test/**/*.{acceptance,e2e}-spec.ts"],
          fileParallelism: false,
        },
      },
    ],
  },
});
