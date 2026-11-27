import { MikroORM } from "@mikro-orm/core";
import { databaseOptions } from "../../src/shared/infrastructure/database/database.options";
import "./env.setup";

export default async function createTestDatabase(): Promise<void> {
  const orm = new MikroORM(databaseOptions(process.env.DATABASE_URL));
  await orm.schema.ensureDatabase();
  await orm.close();
}
