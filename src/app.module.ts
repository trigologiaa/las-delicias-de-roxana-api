import { Module } from "@nestjs/common";
import { HealthController } from "./shared/infrastructure/health/health.controller";

@Module({
  controllers: [HealthController],
})
export class AppModule {}
