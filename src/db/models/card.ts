import mongoose from "mongoose";
import { cardDBSchema } from "../schemas/card.js";

const cardModel = mongoose.model("Card", cardDBSchema);

export default cardModel;
