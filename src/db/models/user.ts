import mongoose from "mongoose";
import { userDBSchema } from "../schemas/user";
import authService from "../../services/auth-service";
import { IUserDoc, IUserModel } from "../schemas/user";

//Using methods means works on documents in Mongo, so this related to the document
userDBSchema.methods.setPassword = async function (password: string) {
  this.password = await authService.hashPassword(password);
  return this.save();
};

//Using statics means works on collection in Mongo, so this related to the collection
userDBSchema.statics.findByEmail = async function (email: string) {
  return this.findOne({ email });
};

const userModel = mongoose.model<IUserDoc, IUserModel>("User", userDBSchema);

export default userModel;
