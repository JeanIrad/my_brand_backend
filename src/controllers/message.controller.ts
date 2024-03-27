import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import Message from "./../models/messageModel";
import sendResponse from "../middleware/sendEmailResponses";

export default class MessageController {
  static getAllMessages = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const messages = await Message.find({}, { __v: false });
      if (!messages) return next(new AppError("no message found", 404));
      res.status(200).json({
        status: "success",
        size: messages.length,
        data: messages,
      });
    }
  );

  static createMessage = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // const { fullName, message, email, interest } = req.body;

      const newmessage = await Message.create(req.body);

      res.status(201).json({
        status: "success",
        data: newmessage,
      });
    }
  );
  static updateMessage = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const message = await Message.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!message) {
        return next(new AppError(`No message Found with id ${id}`, 404));
      }
      res.status(201).json({
        status: "success",
        data: message,
      });
    }
  );
  static deleteMessage = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const message = await Message.findByIdAndDelete(req.params.id);
      if (!message) {
        return next(
          new AppError(`No message found with Id ${req.params.id}`, 404)
        );
      }
      res.status(200).json({
        status: "success",
        message: "deleted",
      });
    }
  );
  static getMessage = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const message = await Message.findById(id);
      if (!message) {
        return next(new AppError(`No message found with the id ${id}`, 404));
      }
      res.status(200).json({
        status: "success",
        message,
      });
    }
  );
  static sendResponse = (req: Request, res: Response, next: NextFunction) => {
    const { name, reason, content, email } = req.body;
    console.log(req.body);
    if (!name || !reason || !content || !email)
      return next(new AppError("Please provide all the required fields", 400));
    sendResponse(name, reason, content, email);
    res.status(200).json({
      status: "success",
      message: "response sent successfully",
    });
  };
}
