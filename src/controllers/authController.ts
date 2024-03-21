import User from "../models/userModel";
import AppError from "../utils/appError";
import JWT from "../utils/jwt";
import catchAsync from "../utils/catchAsync";
import sendVerificationEmail from "../utils/sendEmail";
import VerifyToken from "../models/verifyTokenModel";

import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
const JWTService = new JWT();
dotenv.config({ path: "../env/config.env" });

export default interface LoginUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isVerified?: boolean;
}

interface AuthenticatedRequest extends Request {
  user: LoginUser;
}
const checkLoginPassword = async (
  loginPassword: string,
  registeredPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(loginPassword, registeredPassword);
};
export default class AuthController {
  static signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // console.log(req.body);
      const { email, password, firstName, lastName, isAdmin } = req.body;
      const user = await User.findOne({ email });
      if (user)
        return next(
          new AppError(`User with this email: ${email} already exist!`, 400)
        );
      const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
        isAdmin,
      });
      const verifyToken = await new VerifyToken({
        userId: newUser._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const urlMssg = `http://localhost:3000/api/v1/users/${newUser._id}/verify/${verifyToken.token}`;
      sendVerificationEmail(newUser, urlMssg);
      const sendUserData = {
        email: newUser.email,
        firstName: newUser.firstName,
        isAdmin: newUser.isAdmin,
      };

      res.status(201).json({
        status: "success",
        ...sendUserData,
        message: "user created succefuly!",
      });
    }
  );

  static login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      console.log(req.body);
      if (!email || !password)
        return next(new AppError("Please provide email and password", 400));
      const user = await User.findOne({ email }).select("+password");
      if (!user || !(await checkLoginPassword(password, user.password)))
        return next(new AppError(`Please provide valid credentials!`, 400));
      const token = JWTService.signToken(user.id);
      res.status(200).json({
        status: "success",
        message: "logged in successfully!",
        id: user._id,
        isAdmin: user.isAdmin,
        token,
      });
    }
  );
  static protectRoutes = catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return next(new AppError("you are not authorized, sign up!", 401));
      }
      const token = authorization.split(" ")[1];
      if (!token)
        return next(
          new AppError("Not authorized, please provide a valid token", 401)
        );

      const decodedToken = JWTService.verifyToken(
        token,
        process.env.JWT_SECRET_KEY!
      ) as any;
      const freshUser = await User.findById(decodedToken.id);
      if (!freshUser) return next(new AppError("Invalid token provided", 401));

      req.user = freshUser;
      next();
    }
  );
  static checkAdmin = catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      if (!req.user.isAdmin)
        return next(
          new AppError(
            "you are logged in but do not have permission to access this route",
            401
          )
        );

      next();
    }
  );
}
// console.log(process.env.JWT_EXPIRATION_DATE);
// console.log(process.env.NODE_ENV);
