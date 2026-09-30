import envConfig from "../config/env.config.js";
import mongoose from "mongoose";
import { populateDB } from "./populate-db.js";
import { logger } from "../logs/logger.js";
import dns from "dns";
function getConnString() {
    return envConfig.ENV_TYPE === "cloud"
        ? envConfig.DB_URI.endsWith("/")
            ? `${envConfig.DB_URI}${envConfig.DB_NAME}`
            : `${envConfig.DB_URI}/${envConfig.DB_NAME}`
        : `mongodb://${envConfig.DB_HOST}:${envConfig.DB_PORT}/${envConfig.DB_NAME}`;
}
//Resolve DNS to get srv records for MongoDB, see comment for IPv6 below
dns.setServers(["8.8.8.8", "1.1.1.1"]);
/*
 * Off response from Mongo team, April 2024:
 * Atlas does not support connectivity via IPv6 addresses at this time.
 */
const connect = async (connStr = getConnString()) => {
    try {
        await mongoose.connect(connStr, { family: 4 });
        logger.info(`Connected to DB: ${connStr}`);
    }
    catch (connError) {
        logger.error(`Failed to connect to ${connStr}:` + connError);
        process.exit(1);
    }
    if (envConfig.DB_INIT_TEST_DATA) {
        try {
            await populateDB();
        }
        catch (err) {
            logger.error(`Failed to populate DB:`, err);
        }
    }
};
export default connect;
