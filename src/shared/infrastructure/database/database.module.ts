import { MikroOrmModule } from "@mikro-orm/nestjs";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Module } from "@nestjs/common";
import { databaseOptions } from "./database.options";
import { DatabaseConnectionCheck } from "./database-connection-check";

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      driver: PostgreSqlDriver,
      useFactory: () => databaseOptions(process.env.DATABASE_URL),
    }),
  ],
  providers: [DatabaseConnectionCheck],
})
export class DatabaseModule {}
