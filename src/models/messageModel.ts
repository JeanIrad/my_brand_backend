import mongoose, { model, Schema } from "mongoose";
// import { userSchema } from "./userModel";
import validator from "validator";

const Message = model(
  "Message",
  new Schema({
    fullName: {
      type: String,
      required: [true, "please provide a name"],
      trim: true,
      minlength: 3,
    },
    message: {
      type: String,
      required: [true, "a message must have a description"],
      trim: true,
      minlength: 20,
    },
    email: {
      type: String,
      required: [true, "please provide an email"],
      validate: [validator.isEmail, "provide a valid email"],
    },
    interest: {
      type: String,
      enum: [
        "Web design",
        "Mobile Development",
        "UI/UX Design",
        "Backend Development",
        "Frontend Development",
        "Fullstack Development",
        "Data Analytics",
        "System analysis",
        "Others",
      ],
      trim: true,
      lower: true,
      required: true,
    },
  })
);
export default Message;
