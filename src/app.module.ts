import { Module } from "@nestjs/common";
import { EnvModule } from "./shared/infrastructure/config/env.module";
import { DatabaseModule } from "./shared/infrastructure/database/database.module";
import { HealthController } from "./shared/infrastructure/health/health.controller";

@Module({
  controllers: [HealthController],
  imports: [DatabaseModule, EnvModule],
})
export class AppModule {}
