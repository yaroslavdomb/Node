import mongoose from "mongoose";
import { bizNumberCounterSchema, IBizNumberCounter } from "../schemas/bizNumberCounter.js";

export const BizNumberCounterModel = mongoose.model<IBizNumberCounter>(
  "BizNumberCounter",
  bizNumberCounterSchema,
  "biz_number_counters"
);
