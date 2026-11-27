import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTestApp } from "./support/create-test-app";

describe("API documentation", (): void => {
  let application: INestApplication;

  beforeAll(async (): Promise<void> => {
    application = await createTestApp();
  });

  afterAll(async (): Promise<void> => {
    await application?.close();
  });

  it("shows the OpenAPI documentation at /docs", async (): Promise<void> => {
    const page = await request(application.getHttpServer()).get("/docs");
    const contract = await request(application.getHttpServer()).get(
      "/docs-json",
    );
    expect(page.status).toBe(200);
    expect(page.type).toBe("text/html");
    expect(contract.body.paths).toHaveProperty(["/v1/health"]);
  });
});
