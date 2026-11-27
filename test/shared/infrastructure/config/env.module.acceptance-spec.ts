import { afterEach, describe, expect, it, vi } from "vitest";
import { createTestApp } from "../../../support/create-test-app";

describe("Environment configuration", (): void => {
  afterEach((): void => {
    vi.unstubAllEnvs();
  });

  it("refuses to start when DATABASE_URL is missing", async (): Promise<void> => {
    vi.stubEnv("DATABASE_URL", undefined);
    const startup = createTestApp();
    await expect(startup).rejects.toThrow("DATABASE_URL");
  });

  it("refuses to start when PORT is not a valid port", async (): Promise<void> => {
    vi.stubEnv("PORT", "abc");
    const startup = createTestApp();
    await expect(startup).rejects.toThrow("PORT");
  });
});
