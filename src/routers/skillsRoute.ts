import { Router } from "express";
import skillsController from "../controllers/skills.controller";
import AuthController from "../controllers/authController";
import upload from "../middleware/upload";

const skillsRouter = Router();
skillsRouter
  .route("/")
  .get(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    skillsController.getAllSkills
  )
  .post(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    upload("skills", "image"),
    skillsController.createSkill
  );
skillsRouter
  .route("/:id")
  .get(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    skillsController.getSkill
  )
  .patch(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    skillsController.updateSkill
  )
  .delete(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    skillsController.deleteSkill
  );

export default skillsRouter;
