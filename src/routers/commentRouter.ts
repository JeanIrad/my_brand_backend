import { Router } from "express";
import CommentController from "../controllers/comment.controller";
import AuthController from "../controllers/authController";

const commentRouter = Router();
commentRouter.route("/blog/:id").get(CommentController.getCommentByBlog);
commentRouter
  .route("/")
  .get(CommentController.getAllComments)
  .post(CommentController.createComment)
  .delete(CommentController.deletAllComments);
commentRouter
  .route("/:id")
  .get(CommentController.getComment)
  .patch(AuthController.protectRoutes, CommentController.updateComment)
  .delete(AuthController.protectRoutes, CommentController.deleteComment);

export default commentRouter;
