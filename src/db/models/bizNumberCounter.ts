import mongoose from "mongoose";
import { bizNumberCounterSchema, IBizNumberCounter } from "../schemas/bizNumberCounter";

export const BizNumberCounterModel = mongoose.model<IBizNumberCounter>(
  "BizNumberCounter",
  bizNumberCounterSchema,
  "biz_number_counters"
);
