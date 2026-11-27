import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTestApp } from "../../../support/create-test-app";

describe("GET /v1/health", (): void => {
  let app: INestApplication;

  beforeAll(async (): Promise<void> => {
    app = await createTestApp();
  });

  afterAll(async (): Promise<void> => {
    await app?.close();
  });

  it("reports that the API is up", async (): Promise<void> => {
    const response = await request(app.getHttpServer()).get("/v1/health");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ status: "ok" });
  });
});
