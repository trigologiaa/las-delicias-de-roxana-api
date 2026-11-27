import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.url({
    protocol: /^postgres(ql)?$/,
  }),
});

export class Env {
  public readonly databaseUrl: string;

  public constructor(databaseUrl: string) {
    this.databaseUrl = databaseUrl;
  }
}

export function validateEnv(source: Record<string, string | undefined>): Env {
  const result = schema.safeParse(source);
  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment: ${problems}`);
  }
  return new Env(result.data.DATABASE_URL);
}
