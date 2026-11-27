import { readFile } from "node:fs/promises";
import { parseEnv } from "node:util";
import { describe, expect, it } from "vitest";
import {
  Env,
  validateEnv,
} from "../../../../src/shared/infrastructure/config/env";

describe(".env.example", (): void => {
  it("provides every variable the API needs to start", async (): Promise<void> => {
    const example = parseEnv(await readFile(".env.example", "utf8"));
    const validate: () => Env = (): Env => validateEnv(example);
    expect(validate).not.toThrow();
  });
});
