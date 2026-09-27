import envConfig from "../config/env.config";
import mongoose from "mongoose";
import initDB from "./initializing";

const connect = async (
  connStr: string = `mongodb://${envConfig.DB_HOST}:${envConfig.DB_PORT}/${envConfig.DB_NAME}`
) => {
  try {
    console.log(`**********************************`);

    await mongoose.connect(connStr);
    console.log(`Connected to DB using ${connStr}`);

    await initDB();
    console.log(`DB Initialized`);
  } catch (error) {
    console.error(`Failed to work with DB using ${connStr}: ` + error);
    process.exit(1);
  }
};

export default connect;
