import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";

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
import cookieParser from "cookie-parser";

const { handleInvalidUrl } = HandleInvalidUrl;
const { sendErrorDev } = GlobalError;
const { verifyUserEmail } = UserController;

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: "POST,GET,HEAD,DELETE,PUT,PATCH,UPDATE",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users/:verifyId/verify/:verifyToken", verifyUserEmail);
app.use("/api/v1/messages/", messageRouter);
app.use("/api/v1/skills/", skillsRouter);
app.use("/api/v1/aboutme/", aboutMeRouter);
app.use("/api/v1/portfolio/", portfolioRouter);

// swagger
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: "3.0.0",
//       servers: [
//         {
//           url: "http://localhost:3000/",
//         },
//       ],
//     },
//     apis: ["./routers/*.ts"],
//   },
// };
// Swagger options
const options = {
  definition: {
    openapi: "3.0.0", // specify the version of OpenAPI/Swagger
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "Description of your API",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routers/*.ts"], // specify the directory where your API routes are located
};
// const spacs = swaggerjsdoc({
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Portfolio api documentation",
//       description: "Testing my portfolio endpoints",
//       version: "1.0.0",
//       contact: {
//         name: "Jean De Dieu Iradukunda",
//         email: "jado.milton@gmail.com",
//         url: "jeanIrad.github.io/my_brand ",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:3000/",
//       },
//     ],
//   },
//   apis: ["./routers/*.ts"],

// });
const swaggerSpec = swaggerjsdoc(options);

// Serve Swagger JSON
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerSpec));

app.use("*", handleInvalidUrl);
app.use(sendErrorDev);
export default app;
