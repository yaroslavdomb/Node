import { Schema, Types } from "mongoose";
import { addressDBSchema } from "./address";
import { nameDBSchema } from "./name";
import { imageDBSchema } from "./image";
import { User } from "../../validators/user";

export type userDB = User & {
  createdAt: Date;
  isAdmin: boolean;
  _id: Types.ObjectId;
};

export const userDBSchema = new Schema<userDB>({
  address: { type: addressDBSchema, required: true },
  name: { type: nameDBSchema, required: true },
  image: { type: imageDBSchema, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false, minlength: 8, maxlength: 100 },
  phone: { type: String, required: true },
  isBusiness: { type: Boolean, required: false },
  isAdmin: { type: Boolean, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  _id: {}
});
