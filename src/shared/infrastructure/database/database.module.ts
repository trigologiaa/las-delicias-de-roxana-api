import { MikroOrmModule } from "@mikro-orm/nestjs";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Module } from "@nestjs/common";
import { Env } from "../config/env";
import { databaseOptions } from "./database.options";
import { DatabaseConnectionCheck } from "./database-connection-check";

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      driver: PostgreSqlDriver,
      inject: [Env],
      useFactory: () => databaseOptions(process.env.DATABASE_URL),
    }),
  ],
  providers: [DatabaseConnectionCheck],
})
export class DatabaseModule {}
