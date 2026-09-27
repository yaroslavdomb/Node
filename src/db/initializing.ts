import envConfig from "../config/env.config";
import mongoose from "mongoose";
import userModel from "../db/models/user";
import cardModel from "../db/models/card";
import { generateUsersList } from "../factories/user";

const initDB = async () => {
  if (envConfig.ENV_TYPE !== "prod") {
    console.log(`  >>>>  Start populating DB...`);

    if (envConfig.DB_INIT_INFRA) {
      console.log(`**********************************`);

      console.log(`  >>>>  Start to (re)create DB ...`);
      const testCollection = mongoose.connection.collection(envConfig.DB_TEST_TABLE);
      await testCollection.insertOne({
        test: true,
        insertedAt: new Date().toLocaleString()
      });
      console.log(`  <<<<  Finish to (re)create DB ...`);
      console.log(`**********************************`);

      console.log(`Please check "${envConfig.DB_TEST_TABLE}" collection`);
    }

    if (envConfig.DB_INIT_USERS > 0) {
      console.log(`**********************************`);
      console.log(`  >>>>  Start to init ${envConfig.DB_INIT_USERS} users ...`);
      const usersList = await generateUsersList(envConfig.DB_INIT_USERS);
      await userModel.insertMany(usersList);
      console.log(`  <<<<  Finish to init ${envConfig.DB_INIT_USERS} users ...`);
      console.log(`**********************************`);
    }

    if (envConfig.DB_INIT_CARDS > 0) {
      console.log(`**********************************`);
      console.log(`  >>>>  Start to init ${envConfig.DB_INIT_CARDS} cards ...`);
      const cardsList = await generateCardsList(envConfig.DB_INIT_CARDS);
      await cardModel.insertMany(cardsList);
      console.log(`  <<<<  Finish to init ${envConfig.DB_INIT_CARDS} cards ...`);
      console.log(`**********************************`);
    }
    //TODO: add cards
    console.log(`  <<<<  Finished populating DB`);
  }
};

export default initDB;
