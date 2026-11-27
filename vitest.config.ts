import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

const database = {
  fileParallelism: false,
  globalSetup: ["test/support/database.global-setup.ts"],
  setupFiles: ["test/support/env.setup.ts"],
};

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
          ...database,
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          include: ["test/**/*.{acceptance,e2e}-spec.ts"],
          ...database,
        },
      },
    ],
  },
});
