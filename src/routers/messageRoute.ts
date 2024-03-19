import { Router } from "express";
import MessageController from "../controllers/message.controller";
import AuthController from "../controllers/authController";

const messageRouter = Router();
messageRouter
  .route("/")
  .get(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    MessageController.getAllMessages
  )
  .post(
    // AuthController.protectRoutes,
    // AuthController.checkAdmin,
    MessageController.createMessage
  );
messageRouter
  .route("/:id")
  .get(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    MessageController.getMessage
  )
  .patch(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    MessageController.updateMessage
  )
  .delete(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    MessageController.deleteMessage
  );

export default messageRouter;
