import { describe, expect, it } from "vitest";
import {
  Env,
  validateEnv,
} from "../../../../src/shared/infrastructure/config/env";

describe("validateEnv", (): void => {
  it("names the missing variable", (): void => {
    const source = {
      PORT: "3000",
    };
    const validate = (): Env => validateEnv(source);
    expect(validate).toThrow("Invalid environment: DATABASE_URL");
  });

  it("exposes the port as a number", (): void => {
    const source = {
      DATABASE_URL: "postgresql://user:secret@localhost:5432/db",
      PORT: "4000",
    };
    const env: Env = validateEnv(source);
    expect(env.port).toBe(4000);
  });
});
