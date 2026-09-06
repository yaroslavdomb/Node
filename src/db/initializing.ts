import validatedEnv from "../config/env.config";
import { MongoClient } from "mongodb";

const initDB = async () => {
  if (validatedEnv.ENV !== "prod") {
    console.log(`Start populating DB...`);

    if (validatedEnv.DB_TEST_ENABLED) {
      console.log(`Testing DB start ...`);
      const client = new MongoClient("mongodb://localhost:27017");
      await client.connect();
      await client.db("biz-cards_dev").collection("test").insertOne({
        test: true,
        insertedAt: new Date().toLocaleString()
      });
      await client.close();
      console.log(`Testing DB finished ...`);
    }

    //TODO: add users
    //TODO: add cards
    console.log(`Finished populating DB`);
  }
};

export default initDB;
