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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interest",
      required: true,
    },
  })
);
export default Message;
