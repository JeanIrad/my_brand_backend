import { NextFunction, Response, Request } from "express";
import catchAsync from "./../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/appError";
import VerifyToken from "../models/verifyTokenModel";

export default class UserController {
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
