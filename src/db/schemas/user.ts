import { Schema, Types, Document, Model } from "mongoose";
import { addressDBSchema } from "./address";
import { nameDBSchema } from "./name";
import { imageDBSchema } from "./image";
import { User } from "../../validators/user";

export type userDB = User & {
  createdAt: Date;
  isAdmin: boolean;
  _id: Types.ObjectId;
};

//actions per document
export interface IUserDoc extends userDB, Document {
  setPassword(password: string): Promise<void>;
}

//actions per collection
export interface IUserModel extends Model<IUserDoc> {
  findByEmail(email: string): Promise<IUserDoc | null>;
}

export const userDBSchema = new Schema<IUserDoc, IUserModel>({
  address: { type: addressDBSchema, required: true },
  name: { type: nameDBSchema, required: true },
  image: { type: imageDBSchema, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false, minlength: 8, maxlength: 100 },
  phone: { type: String, required: true },
  isBusiness: { type: Boolean, required: false },
  isAdmin: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now }
});
