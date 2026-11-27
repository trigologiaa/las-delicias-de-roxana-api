import { MikroORM } from "@mikro-orm/core";
import { afterEach, describe, expect, it } from "vitest";
import { databaseOptions } from "../../../../src/shared/infrastructure/database/database.options";
import { DatabaseConnectionCheck } from "../../../../src/shared/infrastructure/database/database-connection-check";

describe("DatabaseConnection", (): void => {
  let orm: MikroORM;

  afterEach(async (): Promise<void> => {
    await orm.close();
  });

  it("fails when Postgres is unreachable", async (): Promise<void> => {
    orm = new MikroORM(
      databaseOptions("postgresql://delicias:delicias@localhost:1/missing"),
    );
    const check = new DatabaseConnectionCheck(orm).onModuleInit();
    await expect(check).rejects.toThrow("Cannot connect to the database");
  });

  it("accepts a reachable Postgres", async (): Promise<void> => {
    orm = new MikroORM(databaseOptions(process.env.DATABASE_URL));
    const check = new DatabaseConnectionCheck(orm).onModuleInit();
    await expect(check).resolves.toBeUndefined();
  });
});
