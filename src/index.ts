import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";
import serverless from "serverless-http";

import blogRouter from "./routers/blogRouter";
import HandleInvalidUrl from "./utils/invalidUrl";
import GlobalError from "./controllers/errorController";
import userRouter from "./routers/userRouter";
import authRoute from "./routers/authRoutes";
import messageRouter from "./routers/messageRoute";
import UserController from "./controllers/userController";
import skillsRouter from "./routers/skillsRoute";
import portfolioRouter from "./routers/portfolioRoute";
import aboutMeRouter from "./routers/aboutMeRoute";
import swaggerdocs from "./swagger/swaggerdocs";

const { handleInvalidUrl } = HandleInvalidUrl;
const { sendErrorDev } = GlobalError;
const { verifyUserEmail } = UserController;

const app = express();
// app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: "POST,GET,HEAD,DELETE,PUT,PATCH,UPDATE",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "welcome to my portfolio",
  });
});
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users/:verifyId/verify/:verifyToken", verifyUserEmail);
app.use("/api/v1/messages/", messageRouter);
app.use("/api/v1/skills/", skillsRouter);
app.use("/api/v1/aboutme/", aboutMeRouter);
app.use("/api/v1/portfolio/", portfolioRouter);

app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerdocs));

app.use("*", handleInvalidUrl);
app.use(sendErrorDev);
// app.use("/.netlify/functions/index");
export default app;
// module.exports.handler = serverless(app);
