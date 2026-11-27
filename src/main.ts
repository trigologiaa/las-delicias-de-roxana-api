import { existsSync } from "node:fs";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configureApp } from "./app-setup";
import { Env } from "./shared/infrastructure/config/env";

if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

const application = await NestFactory.create(AppModule);
configureApp(application);
application.enableShutdownHooks();
await application.listen(application.get(Env).port);
