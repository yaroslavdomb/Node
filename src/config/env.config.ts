import { z } from "zod";
import dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env.dev", quiet: true });

const envSchema = z.object({
  DB_CONNECTION_STR: z.string().min(1, "DB_CONNECTION_STR is mandatory field"),
  DB_PORT: z.coerce.number().min(1000).max(65535),
  SERVER_PORT: z.coerce.number().min(1000).max(65535),
  SERVER: z.string(),
  ENV: z.enum(["prod", "test", "dev"]).default("dev"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
  SCHEMA: z.enum(["http", "https", "ftp"]).default("http"),
  DB_TEST_ENABLED: z.coerce.boolean().default(false)
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Error in conf file");
  result.error.issues.forEach((issue) => {
    console.error(`Error in field ${issue.path} is ${issue.code}`);
  });
  process.exit(1);
}

export default result.data;
