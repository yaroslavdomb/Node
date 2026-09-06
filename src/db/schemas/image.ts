import { Schema } from "mongoose";
import { Image } from "../../validators/image";

export const imageDBSchema = new Schema<Image>({
  url: {
    type: String,
    required: true,
    maxLength: 256
  },
  alt: {
    type: String,
    required: true,
    maxLength: 256
  }
});
