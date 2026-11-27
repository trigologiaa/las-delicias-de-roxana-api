import { existsSync } from "node:fs";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configureApp } from "./app-setup";

if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

const application = await NestFactory.create(AppModule);
configureApp(application);
application.enableShutdownHooks();
await application.listen(process.env.PORT ?? 3000);
