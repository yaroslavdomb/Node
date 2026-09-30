import mongoose from "mongoose";
import { bizNumberCounterSchema } from "../schemas/bizNumberCounter.js";
export const BizNumberCounterModel = mongoose.model("BizNumberCounter", bizNumberCounterSchema, "biz_number_counters");
