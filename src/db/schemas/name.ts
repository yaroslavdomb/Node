import { Schema } from "mongoose";
import { inName } from "../../validators/name";

export const nameDBSchema = new Schema<inName>({
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
    alias: "firstN"
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
    alias: "lastN"
  },
  middleName: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: false
  }
});
