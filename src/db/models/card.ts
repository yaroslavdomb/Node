import mongoose from "mongoose";
import { cardDBSchema } from "../schemas/card";

const cardModel = mongoose.model("Card", cardDBSchema);

export default cardModel;
