import envConfig from "../config/env.config";
import userModel from "../db/models/user";
import cardModel from "../db/models/card";
import { generateUsersList } from "../factories/user";
import { generateCardsList } from "../factories/card";
import { logger } from "../logs/logger";

const initDB = async () => {
  if (envConfig.ENV_TYPE !== "prod") {
    logger.info(`Start populating DB...`);

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

    logger.info(`Finish populating DB`);
  }
};

export default initDB;
