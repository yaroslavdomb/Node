import envConfig from "../config/env.config";
import mongoose from "mongoose";
import { populateDB } from "./populate-db";
import { logger } from "../logs/logger";

function getConnString(): string {
  return envConfig.ENV_TYPE === "prod"
    ? envConfig.DB_URI.endsWith("/")
      ? `${envConfig.DB_URI}${envConfig.DB_NAME}`
      : `${envConfig.DB_URI}/${envConfig.DB_NAME}`
    : `mongodb://${envConfig.DB_HOST}:${envConfig.DB_PORT}/${envConfig.DB_NAME}`;
}

const connect = async (connStr: string = getConnString()) => {
  try {
    await mongoose.connect(connStr);
    logger.info(`Connected to DB: ${connStr}`);
  } catch (connError) {
    logger.error(`Failed to connect to ${connStr}:`, connError);
    process.exit(1);
  }

  if (envConfig.DB_INIT_TEST_DATA) {
    try {
      await populateDB();
    } catch (err) {
      logger.error(`Failed to populate DB:`, err);
    }
  }
};

export default connect;
