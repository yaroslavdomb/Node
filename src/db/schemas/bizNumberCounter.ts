import { Schema } from "mongoose";

export interface IBizNumberCounter {
  _id: string;
  bizNumber: number;
}

export const bizNumberCounterSchema = new Schema<IBizNumberCounter>({
  _id: { type: String, required: true },
  bizNumber: { type: Number, required: true }
});
