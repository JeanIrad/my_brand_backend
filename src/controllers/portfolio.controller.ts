import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import cloudinary from "../utils/cloudinary";
import { Portfolio } from "../models/portfolioModel";

export default class PortfolioController {
  static getAllPortfolios = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const portfolios = await Portfolio.find({}, { __v: false });
      if (!portfolios) return next(new AppError("no portfolio found", 404));
      res.status(200).json({
        status: "success",
        size: portfolios.length,
        portfolios,
      });
    }
  );
  static createPortfolio = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, description } = req.body;
      console.log(req.body);

      if (req.file) {
        const imageUpload = await cloudinary.uploader.upload(req.file.path);
        const newPortfolio = new Portfolio({
          name,
          description,
          imageUrl: imageUpload.secure_url,
        });
        await newPortfolio.save();
        res.status(201).json({
          status: "success",
          newPortfolio,
        });
      }
      // const newPortfolio = await Portfolio.create({ name, createdBy });
      // res.status(201).json({
      //   status: "success",
      //   newPortfolio,
      // });
    }
  );
  static updatePortfolio = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const portfolio = await Portfolio.findOne({ _id: req.params.id });
      if (!portfolio) return next(new AppError("no portfolio found", 404));
      const updatedPortfolio = await Portfolio.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        updatedPortfolio,
      });
    }
  );
  static getPortfolio = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const portfolio = await Portfolio.findById(req.params.id);
      if (!portfolio) return next(new AppError("No portfolio found", 404));
      res.status(200).json({
        status: "success",
        portfolio,
      });
    }
  );
  static deletePortfolio = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const portfolio = await Portfolio.findById(req.params.id);
      if (!portfolio) return next(new AppError("No portfolio found", 404));
      res.status(204).json({
        status: "success",
        message: "deleted",
      });
    }
  );
}
