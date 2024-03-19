import mongoose, { model, Schema } from "mongoose";

export const Comment = model(
  "Comment",
  new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      lower: true,
      minlength: 2,
    },
  })
);
