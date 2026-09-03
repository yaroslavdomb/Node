import { z } from "zod";
import dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env", quiet: true });

const envSchema = z.object({
  DB_CONNECTION_STR: z.string().min(1, "DB_CONNECTION_STR is mandatory field"),
  PORT_NUM: z.coerce.number().min(1000).max(65535),
  MONGO_PORT: z.coerce.number().min(1000).max(65535),
  ENV: z.enum(["prod", "test", "dev"]).default("dev"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
  SERVER: z.string(),
  SCHEMA: z.enum(["http", "https", "ftp"]).default("http")
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
