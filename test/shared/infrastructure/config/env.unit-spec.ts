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
});
