// implement authentication routes right here!
import { Router } from "express";
import AuthController from "./../controllers/authController";

const authRoute = Router();

authRoute.post("/signup", AuthController.signup);
authRoute.post("/login", AuthController.login);

export default authRoute;
