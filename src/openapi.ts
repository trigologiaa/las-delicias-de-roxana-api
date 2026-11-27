import { readFile, writeFile } from "node:fs/promises";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configureApp } from "./app-setup";
import { buildOpenApiDocument } from "./openapi-document";

const FILE = "openapi.json";
const logger: Logger = new Logger("OpenAPI");
const app = await NestFactory.create(AppModule, {
  preview: true,
  logger: ["error"],
});
configureApp(app);
const generated: string = `${JSON.stringify(buildOpenApiDocument(app), null, 2)}\n`;

await app.close();

if (process.argv.includes("--check")) {
  const committed: string = await readFile(FILE, "utf8").catch(() => "");
  if (committed !== generated) {
    logger.error(`${FILE} is out of date. Run: pnpm openapi:generate`);
    process.exitCode = 1;
  }
} else {
  await writeFile(FILE, generated);
}
