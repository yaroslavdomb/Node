import { Schema } from "mongoose";
export const bizNumberCounterSchema = new Schema({
    _id: { type: String, required: true },
    bizNumber: { type: Number, required: true }
});
