import envConfig from "../config/env.config";
import mongoose from "mongoose";
import initDB from "./initializing";
import { logger } from "../logs/logger";

const connect = async (
  connStr: string = `mongodb://${envConfig.DB_HOST}:${envConfig.DB_PORT}/${envConfig.DB_NAME}`
) => {
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
    logger.error("Error wile init DB with test data:", initError);
    process.exit(1);
  }
};

export default connect;
