import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.number().default(5432),
    DATABASE_NAME: z.string(),
    PORT: z.string().default("4000"),
  },
  clientPrefix: "PUBLIC_",
  client: {},
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
