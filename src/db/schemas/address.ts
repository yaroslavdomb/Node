import { Schema } from "mongoose";
import { Address } from "../../validators/address.js";

export const addressDBSchema = new Schema<Address>({
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25
  },
  houseNumber: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 99999
  },
  street: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150
  },
  zipCode: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 99999
  },
  state: {
    type: String,
    required: true,
    default: ""
  }
});
