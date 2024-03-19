import multer from "multer";
import { Router } from "express";
import blogController from "../controllers/blogController";
import AuthController from "../controllers/authController";
import upload from "../middleware/upload";
const { getAllBlogs, createBlog, deleteBlog, updateBlog, getBlog } =
  blogController;
const { protectRoutes, checkAdmin } = AuthController;
const blogRouter = Router();

blogRouter.route("/").get(getAllBlogs).post(upload.single("image"), createBlog);
blogRouter
  .route("/:id")
  .get(protectRoutes, getBlog)
  .patch(protectRoutes, checkAdmin, updateBlog)
  .delete(protectRoutes, checkAdmin, deleteBlog);

export default blogRouter;
