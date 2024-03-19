import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { Comment } from "./../models/comment.model";

export default class MessageController {
  static getAllComments = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const comments = await Comment.find({}, { __v: false });
      if (!comments) return next(new AppError("no comment found", 404));
      res.status(200).json({
        status: "success",
        size: comments.length,
        data: comments,
      });
    }
  );

  static createComment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // const { fullName, message, email, interest } = req.body;

      const newComment = await Comment.create(req.body);

      res.status(201).json({
        status: "success",
        data: newComment,
      });
    }
  );
  static updateComment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const comment = await Comment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!comment) {
        return next(new AppError(`No message Found`, 404));
      }
      res.status(201).json({
        status: "success",
        data: comment,
      });
    }
  );
  static deleteComment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) {
        return next(new AppError(`No message found`, 404));
      }
      res.status(200).json({
        status: "success",
        message: "deleted",
      });
    }
  );
  static getComment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const comment = await Comment.findById(id);
      if (!comment) {
        return next(new AppError(`No message found`, 404));
      }
      res.status(200).json({
        status: "success",
        message: comment,
      });
    }
  );
}
