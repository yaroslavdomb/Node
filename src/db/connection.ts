import validatedEnv from "../config/env.config";
import mongoose from "mongoose";
import initDB from "./initializing";

const connect = async (connStr: string = validatedEnv.DB_CONNECTION_STR) => {
  try {
    console.log(`**********************************`);

    await mongoose.connect(connStr);
    console.log(`Connected to DB using ${connStr}`);

    await initDB();
    console.log(`DB Initialized`);
  } catch (error) {
    console.error(`Failed to work with DB using ${connStr}`);
    process.exit(1);
  }
};

export default connect;
