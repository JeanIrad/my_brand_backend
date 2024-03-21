import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import Blog from "../models/blogModel";
import upload from "../middleware/upload";
import cloudinary from "../utils/cloudinary";
import fs from "fs";

export default class BlogController {
  static getAllBlogs = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const blogs = await Blog.find({}, { __v: false });
      res.status(200).json({
        status: "success",
        size: blogs.length,
        data: blogs,
      });
    }
  );

  static createBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("body", req.body);
      const uploadImage = await cloudinary.uploader.upload(req.file!.path);

      const newBlog = await new Blog({
        title: req.body.title,
        description: req.body.description,
        imageUrl: uploadImage.secure_url,
        fileName: req.file?.filename || "",
        author: req.body.author,
      }).save();
      res.status(201).json({
        status: "success",
        data: newBlog,
      });
    }
  );
  static updateBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const blog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!blog) {
        return next(new AppError(`No Blog Found with id ${id}`, 404));
      }
      res.status(201).json({
        status: "success",
        data: blog,
      });
    }
  );
  static deleteBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // console.log(__dirname);
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (!blog) {
        return next(
          new AppError(`No blog found with Id ${req.params.id}`, 404)
        );
      }
      let fileFoundMssg = "";
      const id = req.params.id;
      const deleteBlog = await Blog.findById(id);
      const filePath = path.resolve(
        __dirname,
        `../uploads/blogs/${deleteBlog?.fileName}`
      );
      if (!fs.existsSync(filePath)) {
        fileFoundMssg = "no file attached";
      } else {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("error");
            return next(new AppError("failed to delete file", 500));
          } else {
            fileFoundMssg = "file deleted successfully!";
          }
        });
      }
      res.status(200).json({
        status: "success",
        message: "deleted",
        fileFoundMssg,
      });
    }
  );
  static getBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const blog = await Blog.findById(id);
      if (!blog) {
        return next(new AppError(`No blog found with the id ${id}`, 404));
      }
      res.status(200).json({
        status: "success",
        blog,
      });
    }
  );
}
