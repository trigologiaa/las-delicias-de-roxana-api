import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { readAppVersion } from "../../../../src/shared/infrastructure/health/app-version";

describe("readAppVersion", (): void => {
  let directory: string;

  beforeEach(async (): Promise<void> => {
    directory = await mkdtemp(join(tmpdir(), "app-version"));
  });

  afterEach(async (): Promise<void> => {
    await rm(directory, {
      recursive: true,
    });
  });

  it("returns the version declared in the given package.json", async (): Promise<void> => {
    const file: string = join(directory, "package.json");
    await writeFile(file, JSON.stringify({ version: "9.8.7" }));
    const version: string = readAppVersion(pathToFileURL(file));
    expect(version).toBe("9.8.7");
  });
});
