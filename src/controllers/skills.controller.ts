import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import { Skill } from "../models/skills.model";
import AppError from "../utils/appError";
import cloudinary from "../utils/cloudinary";

export default class SkillController {
  static getAllSkills = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const skills = await Skill.find({}, { __v: false });
      if (!skills) return next(new AppError("no skills found", 404));
      res.status(200).json({
        status: "success",
        size: skills.length,
        skills,
      });
    }
  );
  static createSkill = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, image, createdBy } = req.body;
      if (req.file) {
        const imageUpload = await cloudinary.uploader.upload(req.file.path);
        const newSkill = new Skill({
          name,
          createdBy,
          imageUrl: imageUpload.secure_url,
        });
        await newSkill.save();
        res.status(201).json({
          status: "success",
          newSkill,
        });
      }
      const newSkill = await Skill.create({ name, createdBy });
      res.status(201).json({
        status: "success",
        newSkill,
      });
    }
  );
  static updateSkill = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const skill = await Skill.findOne({ _id: req.params.id });
      if (!skill) return next(new AppError("no skill found", 404));
      const updatedSkill = await Skill.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        updatedSkill,
      });
    }
  );
  static getSkill = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const skill = await Skill.findById(req.params.id);
      if (!skill) return next(new AppError("No skill found", 404));
      res.status(200).json({
        status: "success",
        skill,
      });
    }
  );
  static deleteSkill = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const skill = await Skill.findById(req.params.id);
      if (!skill) return next(new AppError("No skill found", 404));
      res.status(204).json({
        status: "success",
        message: "deleted",
      });
    }
  );
}
