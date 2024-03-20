"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var blogRouter_1 = __importDefault(require("./routers/blogRouter"));
var invalidUrl_1 = __importDefault(require("./utils/invalidUrl"));
var errorController_1 = __importDefault(
  require("./controllers/errorController")
);
var userRouter_1 = __importDefault(require("./routers/userRouter"));
var authRoutes_1 = __importDefault(require("./routers/authRoutes"));
var messageRoute_1 = __importDefault(require("./routers/messageRoute"));
var userController_1 = __importDefault(require("./controllers/userController"));
var skillsRoute_1 = __importDefault(require("./routers/skillsRoute"));
var portfolioRoute_1 = __importDefault(require("./routers/portfolioRoute"));
var aboutMeRoute_1 = __importDefault(require("./routers/aboutMeRoute"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var handleInvalidUrl = invalidUrl_1.default.handleInvalidUrl;
var sendErrorDev = errorController_1.default.sendErrorDev;
var verifyUserEmail = userController_1.default.verifyUserEmail;
var app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(
  (0, cors_1.default)({
    origin: "*",
    methods: "POST,GET,HEAD,DELETE,PUT,PATCH,UPDATE",
    credentials: true,
  })
);
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1/blogs", blogRouter_1.default);
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/users", userRouter_1.default);
app.use("/api/v1/users/:verifyId/verify/:verifyToken", verifyUserEmail);
app.use("/api/v1/messages/", messageRoute_1.default);
app.use("/api/v1/skills/", skillsRoute_1.default);
app.use("/api/v1/aboutme/", aboutMeRoute_1.default);
app.use("/api/v1/portfolio/", portfolioRoute_1.default);
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
var options = {
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
var swaggerSpec = (0, swagger_jsdoc_1.default)(options);
// Serve Swagger JSON
app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use(
  "/api-docs",
  swagger_ui_express_1.default.serve,
  swagger_ui_express_1.default.setup(swaggerSpec)
);
app.use("*", handleInvalidUrl);
app.use(sendErrorDev);
exports.default = app;
