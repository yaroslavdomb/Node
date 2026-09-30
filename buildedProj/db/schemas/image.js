import { Schema } from "mongoose";
export const imageDBSchema = new Schema({
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
