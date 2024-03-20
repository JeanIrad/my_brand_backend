import mongoose, { model, Schema } from "mongoose";
import multer from "multer";

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "A blog must have a title"],
    min: 2,
  },
  description: {
    type: String,
    required: [true, "A blog must have a description"],
    trim: true,
    // minlength: 100
    minlength: 10,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  imageUrl: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileName: String,
});
const Blog = model("Blog", blogSchema);
export default Blog;
