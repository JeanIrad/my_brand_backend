import { Router } from "express";
import AboutMeController from "../controllers/aboutMe.controller";

const aboutMeRouter = Router();
aboutMeRouter
  .get("/", AboutMeController.getAboutMe)
  .post("/", AboutMeController.createAboutMe)
  .patch("/:id", AboutMeController.updateAboutMe)
  .delete("/:id", AboutMeController.deleteAboutMe);

export default aboutMeRouter;
