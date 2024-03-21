import mongoose, { model, Schema } from "mongoose";
import multer from "multer";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A blog must have a title"],
      minlength: 2,
      maxlength: 255,
    },
    description: {
      type: String,
      required: [true, "A blog must have a description"],
      trim: true,
      minlength: 10,
    },
    // image: {
    //   data: Buffer,
    //   contentType: String,
    // },
    imageUrl: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    fileName: String,
    comment: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Blog = model("Blog", blogSchema);
export default Blog;
