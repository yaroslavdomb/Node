import envConfig from "../config/env.config";
import mongoose from "mongoose";
import initDB from "./initializing";
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
  } catch (connError) {
    logger.error(`Failed to connect to ${connStr}:`, connError);
    process.exit(1);
  }
  logger.info(`Connected to DB: ${connStr}`);

  try {
    await initDB();
  } catch (initError) {
    logger.error(`Error wile init DB with test data: ${initError.message}`);
    process.exit(1);
  }
};

export default connect;
