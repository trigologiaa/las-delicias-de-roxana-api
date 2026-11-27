import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

export function buildOpenApiDocument(app: INestApplication): OpenAPIObject {
  const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
    .setTitle("Las Delicias de Roxana API")
    .build();
  return SwaggerModule.createDocument(app, config);
}
