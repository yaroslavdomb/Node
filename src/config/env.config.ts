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
  DB_HOST: z.string().min(1, "DB_HOST is mandatory field"),
  DB_PORT: z.coerce.number().min(1000).max(65535),
  DB_URI: z.string().default(""),
  DB_NAME: z.string().min(1, "DB_NAME is mandatory field"),
  DB_INIT_USERS: z.coerce.number().min(0).default(3),
  DB_INIT_CARDS: z.coerce.number().min(0).default(15),
  SERVER_PORT: z.coerce.number().min(1000).max(65535),
  SERVER: z.string(),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
  SCHEMA: z.enum(["http", "https", "ftp"]).default("http"),
  JWT_SECRET: z.string().min(32, "JWT is mandatory"),
  JWT_VALID_TIME: z.string().default("15min"),
  TRUST_PROXY: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .default(false),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(15 * 60 * 1000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(200),
  JSON_BODY_LIMIT: z.string().default("2kb"),
  LOGIN_RETRY_LIMIT: z.coerce.number().default(5),
  LOGIN_WINDOW_DURATION: z.coerce.number().default(3600),
  LOGIN_BLOCK_DURATION: z.coerce.number().default(7200),
  FILE_LOG_ENABLED: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .default(true),
  FILE_LOG_SIZE: z.string().default("10MB"),
  FILE_LOG_PREFIX: z.string().default("nodeProject")
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
