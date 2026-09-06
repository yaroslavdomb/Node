import { Schema, Types } from "mongoose";

import { addressDBSchema } from "./address";
import { imageDBSchema } from "./image";
import { Card } from "../../validators/card";

export type cardDB = Card & {
  userId: string;
  bizNumber: string;
  likesNum: number;
  likedBy: String[];
  createdAt: Date;
  _id: Types.ObjectId;
};

export const cardDBSchema = new Schema<cardDB>({
  title: { type: String, required: true, minlength: 2, maxlength: 100 },
  subtitle: { type: String, required: true, minlength: 2, maxlength: 100 },
  description: { type: String, required: true, minlength: 2, maxlength: 700 },
  phone: { type: String, required: true, minlength: 3, maxlength: 15 },
  email: { type: String, required: true, minlength: 5, maxlength: 256 },
  web: { type: String, required: true, minlength: 5, maxlength: 256 },
  address: { type: addressDBSchema, required: true },
  image: { type: imageDBSchema, required: true },
  userId: { type: String, required: true },
  bizNumber: { type: String, required: true, unique: true },
  likesNum: { type: Number, required: true },
  likedBy: { type: [String], required: true },
  createdAt: { type: Date, required: true, default: Date.now }
});
