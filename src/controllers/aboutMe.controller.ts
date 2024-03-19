import { Request, Response, NextFunction } from "express";

import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { AboutMe } from "../models/aboutMeModel";

export default class AboutMeController {
  static getAboutMe = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const aboutMe = await AboutMe.find({}, { __v: false });
      if (!aboutMe) return next(new AppError("No about me found yet", 404));
      res.status(200).json({
        status: "success",
        aboutMe,
      });
    }
  );
  static createAboutMe = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const aboutMe = await AboutMe.create(req.body);
      res.status(200).json({
        status: "success",
        aboutMe,
      });
    }
  );
  static updateAboutMe = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const about = await AboutMe.findById(req.params.id);
      if (!about) return next(new AppError("No about me found", 404));
      const updatedAbout = await AboutMe.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "sucess",
        updatedAbout,
      });
    }
  );
  static deleteAboutMe = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const about = await AboutMe.findById(req.params.id);
      if (!about) return next(new AppError("No about found with that id", 404));
      await AboutMe.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: "success",
        message: "deleted",
      });
    }
  );
}
