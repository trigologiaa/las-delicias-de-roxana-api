import { Controller, Get } from "@nestjs/common";
import { readAppVersion } from "./app-version";

@Controller("health")
export class HealthController {
  @Get()
  check() {
    return {
      status: "ok",
      version: readAppVersion(),
    };
  }
}
