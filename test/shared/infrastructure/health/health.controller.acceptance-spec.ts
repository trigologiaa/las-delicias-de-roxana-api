import { readFile } from "node:fs/promises";
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

  it("reports the version declared in package.json", async (): Promise<void> => {
    const { version } = JSON.parse(await readFile("package.json", "utf8"));
    const response = await request(app.getHttpServer()).get("/v1/health");
    expect(response.body).toEqual({ status: "ok", version });
  });
});
