import { MikroORM } from "@mikro-orm/core";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class DatabaseConnectionCheck implements OnModuleInit {
  private readonly orm: MikroORM;

  public constructor(orm: MikroORM) {
    this.orm = orm;
  }

  public async onModuleInit(): Promise<void> {
    try {
      await this.orm.connect();
      await this.orm.em.getConnection().execute("SELECT 1");
    } catch (cause) {
      throw new Error("Cannot connect to the database", { cause });
    }
  }
}
