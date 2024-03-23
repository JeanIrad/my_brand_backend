import { Router } from "express";
import CommentController from "../controllers/comment.controller";
import AuthController from "../controllers/authController";

const commentRouter = Router();
commentRouter
  .route("/")
  .get(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    CommentController.getAllComments
  )
  .post(CommentController.createComment);
commentRouter
  .route("/:id")
  .get(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    CommentController.getComment
  )
  .patch(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    CommentController.updateComment
  )
  .delete(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    CommentController.deleteComment
  );

export default commentRouter;
