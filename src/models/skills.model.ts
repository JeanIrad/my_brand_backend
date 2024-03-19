import mongoose, { model, Schema } from "mongoose";

export const Skill = model(
  "Skill",
  new Schema({
    name: {
      type: String,
      required: [true, "a portfolio must have a name"],
      trim: true,
      minlength: 6,
    },

    image: {
      data: Buffer,
      contentType: String,
    },
    imageUrl: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  })
);
