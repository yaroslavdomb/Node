import envConfig from "../config/env.config.js";
import userModel from "./models/user.js";
import cardModel from "./models/card.js";
import { generateUsersList } from "../factories/user.js";
import { generateCardsList } from "../factories/card.js";
import { logger } from "../logs/logger.js";

/**
 * Pay attention - the function use already opened global connection to DB
 * So:
 * 1) No need to open/close - especially to close! - a new connection
 * 2) This func should be calleed only after global connection had been established
 *  */
export const populateDB = async () => {
  logger.info(` >>> Start populating DB...`);

  if (envConfig.DB_INIT_USERS > 0) {
    const usersList = await generateUsersList(envConfig.DB_INIT_USERS);
    await userModel.insertMany(usersList);
    logger.info(`${envConfig.DB_INIT_USERS} users created`);
  }

  if (envConfig.DB_INIT_CARDS > 0) {
    const cardsList = await generateCardsList(envConfig.DB_INIT_CARDS);
    await cardModel.insertMany(cardsList);
    logger.info(`${envConfig.DB_INIT_CARDS} cards created`);
  }

  logger.info(` <<< Finish populating DB`);
};
