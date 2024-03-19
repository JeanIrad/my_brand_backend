import { model, Schema } from "mongoose";

export const Interest = model(
  "Interest",
  new Schema({
    interest: {
      type: String,
      required: [, "choose your interest!"],
      enum: ["Web design", "Data analytics", "system analysis", "others"],
      default: "others",
    },
  })
);
