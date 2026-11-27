import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";

export function databaseOptions(clientUrl: string | undefined) {
  return defineConfig({
    clientUrl,
    discovery: {
      warnWhenNoEntities: false,
    },
    entities: [],
    extensions: [Migrator],
    migrations: {
      path: "dist/shared/infrastructure/database/migrations",
      pathTs: "src/shared/infrastructure/database/migrations",
    },
  });
}
