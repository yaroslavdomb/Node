import { Schema } from "mongoose";
import { inName } from "../../validators/name";

export const nameDBSchema = new Schema<inName>({
  first: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
    alias: "firstN"
  },
  last: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
    alias: "lastN"
  },
  middle: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: false
  }
});
