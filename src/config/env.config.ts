import { z } from "zod";
import dotenv from "dotenv";
import path from "node:path";

const envTypeSchema = z.enum(["prod", "test", "dev"]).default("dev");
const envType = envTypeSchema.safeParse(process.env.ENV_TYPE);
if (!envType.success) {
  console.error(`Wrong ENV_TYPE provided: "${process.env.ENV_TYPE}". Proper values are "prod/test/dev".`);
  process.exit(1);
}

dotenv.config({
  path: path.resolve(process.cwd(), `src/config/.env.${envType.data}`),
  quiet: true
});

const envSchema = z.object({
  ENV_TYPE: envTypeSchema,
  DB_CONNECTION_STR: z.string().min(1, "DB_CONNECTION_STR is mandatory field"),
  DB_PORT: z.coerce.number().min(1000).max(65535),
  DB_TEST_ENABLED: z.coerce.boolean().default(false),
  SERVER_PORT: z.coerce.number().min(1000).max(65535),
  SERVER: z.string(),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
  SCHEMA: z.enum(["http", "https", "ftp"]).default("http"),
  JWT_SECRET: z.string().min(32, "JWT is mandatory"),
  JWT_VALID_TIME: z.string().default("15min"),
  TRUST_PROXY: z.coerce.boolean().default(false),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(15 * 60 * 1000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(200),
  JSON_BODY_LIMIT: z.string().default("2kb")
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Error in env config file!");
  result.error.issues.forEach((issue) => {
    console.error(`Error in field ${issue.path.join(".")} : ${issue.message}`);
  });
  process.exit(1);
}

export default result.data;
