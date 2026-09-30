import { Schema } from "mongoose";
import { addressDBSchema } from "./address.js";
import { nameDBSchema } from "./name.js";
import { imageDBSchema } from "./image.js";
export const userDBSchema = new Schema({
    address: { type: addressDBSchema, required: true },
    name: { type: nameDBSchema, required: true },
    image: { type: imageDBSchema, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false, minlength: 8, maxlength: 100 },
    phone: { type: String, required: true },
    isBusiness: { type: Boolean, required: false },
    isAdmin: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: Date.now }
});
