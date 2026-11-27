import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [swc.vite({ module: { type: "es6" } })],
  test: {
    passWithNoTests: true,
    projects: [
      {
        extends: true,
        test: {
          include: ["src/**/*.spec.ts"],
          name: "unit",
        },
      },
      {
        extends: true,
        test: {
          fileParallelism: false,
          include: ["src/**/*.int-spec.ts"],
          name: "integration",
        },
      },
      {
        extends: true,
        test: {
          include: ["acceptance/**/*.e2e-spec.ts"],
          fileParallelism: false,
          name: "e2e",
        },
      },
    ],
  },
});
