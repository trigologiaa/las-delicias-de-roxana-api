import { existsSync } from "node:fs";
import { databaseOptions } from "./shared/infrastructure/database/database.options";

if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

export default databaseOptions(process.env.DATABASE_URL);
