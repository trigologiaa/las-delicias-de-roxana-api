import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { readAppVersion } from "./app-version";
import { HealthResponseDto } from "./health-response.dto";

@Controller("health")
export class HealthController {
  @Get()
  @ApiOkResponse({ type: HealthResponseDto })
  check() {
    return {
      status: "ok",
      version: readAppVersion(),
    };
  }
}
