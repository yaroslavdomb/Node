import mongoose from "mongoose";
import { userDBSchema } from "../schemas/user";

const userModel = mongoose.model("User", userDBSchema);

export default userModel;
