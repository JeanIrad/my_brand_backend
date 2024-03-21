// import { model, Schema, Document } from "mongoose";
// import bcrypt from "bcrypt";
// import validator from "validator";

// interface UserDocument extends Document {
//   password: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   isAdmin?: boolean;
//   isVerified?: boolean;
// }

// export const userSchema = new Schema({
//   firstName: {
//     type: String,
//     required: [true, "please provide the first Name"],
//   },
//   lastName: {
//     type: String,
//     required: [true, "please provide the last Name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//     lower: true,
//     validate: [validator.isEmail, "Please provide a valid email"],
//   },
//   password: {
//     type: String,
//     required: [true, "A password is required"],
//     select: false,
//     minlength: 8,
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
// });
// userSchema.pre("save", async function (next) {
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// const User = model("User", userSchema);
// export default User;

import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// Define the interface for User document
export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isVerified: boolean;
}

// Define the schema for User model
const userSchema = new Schema<UserDocument>({
  firstName: {
    type: String,
    required: [true, "Please provide the first Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide the last Name"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
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

// Hash the password before saving
userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Define the User model
const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);
export default User;
