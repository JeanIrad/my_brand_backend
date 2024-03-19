import { NextFunction, Response, Request } from "express";
import catchAsync from "./../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/appError";
import VerifyToken from "../models/verifyTokenModel";

export default class UserController {
  /**
   * @swagger
   * tags:
   *   name: User
   *   description: list of users
   * /api/v1/users:
   *   get:
   *     summary: Get all users
   *     description: Retrieve a list of all users.
   *     responses:
   *       '200':
   *         description: A list of users.
   *       '404':
   *         description: No users found.
   */
  static getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await User.find({}, { __v: false });
      if (!users) {
        return next(new AppError("No Users found", 404));
      }
      res.status(200).json({
        status: "success",
        size: users.length,
        users,
      });
    }
  );
  /**
   * @swagger
   * /api/v1/users/{id}:
   *   get:
   *     summary: Get a user by ID
   *     description: Retrieve a user by their ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user to retrieve.
   *     responses:
   *       '200':
   *         description: The user object.
   *       '404':
   *         description: No user found with that ID.
   */

  static getUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) {
        return next(new AppError("No User found with that id", 404));
      }
      res.status(200).json({
        status: "success",
        user,
      });
    }
  );
  /**
   * @swagger
   * /api/v1/users/{id}:
   *   patch:
   *     summary: Update a user by ID
   *     description: Update a user's details by their ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user to update.
   *     responses:
   *       '200':
   *         description: The updated user object.
   *       '404':
   *         description: No user found with that ID.
   */
  static updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user)
        return next(new AppError("No user found with specified id", 404));
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        updatedUser,
      });
    }
  );

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   delete:
   *     summary: Delete a user by ID
   *     description: Delete a user by their ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user to delete.
   *     responses:
   *       '204':
   *         description: User deleted successfully.
   *       '404':
   *         description: No user found with that ID.
   */
  static deleteUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user)
        return next(new AppError("No user found with the specified id", 404));
      await User.findByIdAndDelete(id);
      res.status(204).json({});
    }
  );

  /**
   * @swagger
   * /api/v1/users/verify/{verifyId}/{verifyToken}:
   *   get:
   *     summary: Verify user's email
   *     description: Verify a user's email using the verification token and ID.
   *     parameters:
   *       - in: path
   *         name: verifyId
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user to verify.
   *       - in: path
   *         name: verifyToken
   *         schema:
   *           type: string
   *         required: true
   *         description: Verification token sent to the user's email.
   *     responses:
   *       '200':
   *         description: User email verified successfully.
   *       '400':
   *         description: Invalid token provided.
   *       '404':
   *         description: No user found with the provided ID.
   */
  static verifyUserEmail = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await User.findOne({ _id: req.params.verifyId });
      if (!user) return next(new AppError("no user found with this id", 404));
      const token = await VerifyToken.findOne({
        token: req.params.verifyToken,
        userId: user._id,
      });
      if (!token) return next(new AppError("invalid token provided", 400));
      await User.findByIdAndUpdate(
        user._id,
        { isVerified: true },
        {
          new: true,
          runValidators: true,
        }
      );
      await token.deleteOne({ userId: user._id });
      // next();
      res.status(200).json({
        status: "success",
        message: "user verified successfully!",
      });
    }
  );
}
