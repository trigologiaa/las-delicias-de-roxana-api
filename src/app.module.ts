import { Module } from "@nestjs/common";
import { DatabaseModule } from "./shared/infrastructure/database/database.module";
import { HealthController } from "./shared/infrastructure/health/health.controller";

@Module({
  controllers: [HealthController],
  imports: [DatabaseModule],
})
export class AppModule {}
