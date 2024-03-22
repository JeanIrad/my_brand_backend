import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import AppError from "../utils/appError";
import { CastError } from "mongoose";

export default class GlobalError {
  static sendErrorDev = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    let castError = { ...err } as any;
    if (err.name === "ValidationError") {
      let error = { ...err };
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((el) => el.message)
          .join(" "),
      });
    }
    if (err.name === "Error") {
      return res.status(err.statusCode).json({
        message: err.message,
        // name: err.name,
      });
    }
    if (err.name === "JsonWebTokenError")
      return res.status(400).json({
        message: `invalid token!`,
      });
    if (err.name === "TokenExpiredError")
      return res.status(400).json({
        message: "token expired, please login to proceed!",
      });
    if (err.name === "CastError")
      return res.status(400).json({
        // message: `Invalid ${err.path}: ${err.value}`,
        message: `Invalid ${castError.path}: ${castError.value}.`,
      });
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      name: err.name,
      err,
    });
  };
}
