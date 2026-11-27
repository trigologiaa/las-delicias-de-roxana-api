import { afterEach, describe, expect, it, vi } from "vitest";
import { createTestApp } from "../../../support/create-test-app";

describe("Database connection", (): void => {
  afterEach((): void => {
    vi.unstubAllEnvs();
  });

  it("refuses to start when Postgres is unreachable", async (): Promise<void> => {
    vi.stubEnv(
      "DATABASE_URL",
      "postgresql://delicias:delicias@localhost:1/delicias_test",
    );
    const startup = createTestApp();
    await expect(startup).rejects.toThrow(/database/i);
  });
});
