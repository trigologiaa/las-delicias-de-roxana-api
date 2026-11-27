import { INestApplication } from "@nestjs/common";
import { OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { buildOpenApiDocument } from "./openapi-document";

export function configureApp(application: INestApplication): void {
  application.setGlobalPrefix("v1");
  SwaggerModule.setup(
    "docs",
    application,
    (): OpenAPIObject => buildOpenApiDocument(application),
  );
}
