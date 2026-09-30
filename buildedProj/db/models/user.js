import mongoose from "mongoose";
import { userDBSchema } from "../schemas/user.js";
import authService from "../../services/auth-service.js";
//Using methods means works on documents in Mongo, so this related to the document
userDBSchema.methods.setPassword = async function (password) {
    this.password = await authService.hashPassword(password);
    return this.save();
};
//Using statics means works on collection in Mongo, so this related to the collection
userDBSchema.statics.findByEmail = async function (email) {
    return this.findOne({ email });
};
const userModel = mongoose.model("User", userDBSchema);
export default userModel;
