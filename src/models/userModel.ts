import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// interface User extends Document{
//     password: string
// }

export const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "please provide the first Name"],
  },
  lastName: {
    type: String,
    required: [true, "please provide the last Name"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lower: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    select: false,
    minlength: 8,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = model("User", userSchema);
export default User;
