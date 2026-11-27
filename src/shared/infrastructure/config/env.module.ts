import { Global, Module } from "@nestjs/common";
import { Env, validateEnv } from "./env";

@Global()
@Module({
  exports: [Env],
  providers: [
    {
      provide: Env,
      useFactory: (): Env => validateEnv(process.env),
    },
  ],
})
export class EnvModule {}
