import envConfig from "../config/env.config";
import mongoose from "mongoose";
import initDB from "./initializing";

const connect = async (
  connStr: string = `mongodb://${envConfig.DB_HOST}:${envConfig.DB_PORT}/${envConfig.DB_NAME}`
) => {
  console.log(`**********************************`);
  try {
    await mongoose.connect(connStr);
  } catch (connError) {
    console.error(`Failed to connect to ${connStr}:`, connError);
    process.exit(1);
  }
  console.log(`Connected to DB: ${connStr}`);

  try {
    await initDB();
  } catch (initError) {
    console.error("Error wile init DB with test data:\n", initError);
    process.exit(1);
  }

  console.log(`**********************************`);
  console.log(`Ready for action!`);
  console.log(`**********************************`);
};

export default connect;
