import envConfig from "../config/env.config";
import mongoose from "mongoose";
import userModel from "../db/models/user";
import cardModel from "../db/models/card";
import { generateUsersList } from "../factories/user";
import { generateCardsList } from "../factories/card";

const initDB = async () => {
  if (envConfig.ENV_TYPE !== "prod") {
    console.log(`  >>>>  Start populating DB...`);

    if (envConfig.DB_INIT_USERS > 0) {
      console.log(`    >>>>  Start to init ${envConfig.DB_INIT_USERS} users ...`);
      const usersList = await generateUsersList(envConfig.DB_INIT_USERS);
      await userModel.insertMany(usersList);
      console.log(`    <<<<  Finish to init ${envConfig.DB_INIT_USERS} users ...`);
    }

    if (envConfig.DB_INIT_CARDS > 0) {
      console.log(`    >>>>  Start to init ${envConfig.DB_INIT_CARDS} cards ...`);
      const cardsList = await generateCardsList(envConfig.DB_INIT_CARDS);
      await cardModel.insertMany(cardsList);
      console.log(`    <<<<  Finish to init ${envConfig.DB_INIT_CARDS} cards ...`);
    }

    console.log(`  <<<<  Finish populating DB`);
  }
};

export default initDB;
