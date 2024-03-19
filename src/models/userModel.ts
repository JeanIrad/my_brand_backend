// import { model, Schema, Document } from "mongoose";
// import bcrypt from "bcrypt";
// import validator from "validator";

// // interface User extends Document{
// //     password: string
// // }

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
// // userSchema.methods.checkLoginPassword = async (
// //   loginPassword: string,
// //   registeredPassword: string
// // ) => {
// //   return await bcrypt.compare(loginPassword, registeredPassword);
// // };
// const User = model("User", userSchema);
// export default User;

import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user. Must be unique.
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user.
 *         isAdmin:
 *           type: boolean
 *           description: Indicates whether the user is an administrator.
 *         isVerified:
 *           type: boolean
 *           description: Indicates whether the user's email address has been verified.
 */

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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Bad request, user creation failed
 *       '500':
 *         description: Internal server error
 */
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const User = model("User", userSchema);
export default User;
