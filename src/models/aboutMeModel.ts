import { model, Schema } from "mongoose";

export const AboutMe = model(
  "AboutMe",
  new Schema({
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    cv: {
      data: Buffer,
      contentType: String,
    },
  })
);
