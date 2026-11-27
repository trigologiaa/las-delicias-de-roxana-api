import { readFileSync } from "node:fs";

const PACKAGE_JSON: URL = new URL("../../../../package.json", import.meta.url);

export function readAppVersion(packageJson: URL = PACKAGE_JSON): string {
  return JSON.parse(readFileSync(packageJson, "utf8")).version;
}
