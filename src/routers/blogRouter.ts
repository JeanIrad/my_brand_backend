import multer from "multer";
import { Router } from "express";
import blogController from "../controllers/blogController";
import AuthController from "../controllers/authController";
import upload from "../middleware/upload";
const { getAllBlogs, createBlog, deleteBlog, updateBlog, getBlog } =
  blogController;
const { protectRoutes, checkAdmin } = AuthController;
const blogRouter = Router();

blogRouter
  .route("/")
  .get(getAllBlogs)
  .post(
    (req, res, next) => {
      console.log("receiving", req.body);
      if (req.file) {
        console.log(req.file.filename);
        next();
      } else {
        next();
      }
    },
    upload.single("image"),
    createBlog
  );
blogRouter
  .route("/:id")
  .get(getBlog)
  .patch(
    (req, res, next) => {
      console.log("body is:", req.body);
      console.log("............logging..........");
      next();
    },
    protectRoutes,
    checkAdmin,
    upload.single("image"),
    updateBlog
  )
  .delete(protectRoutes, checkAdmin, deleteBlog);

export default blogRouter;
