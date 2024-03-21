"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var blogRouter_1 = __importDefault(require("./routers/blogRouter"));
var invalidUrl_1 = __importDefault(require("./utils/invalidUrl"));
var errorController_1 = __importDefault(require("./controllers/errorController"));
var userRouter_1 = __importDefault(require("./routers/userRouter"));
var authRoutes_1 = __importDefault(require("./routers/authRoutes"));
var messageRoute_1 = __importDefault(require("./routers/messageRoute"));
var userController_1 = __importDefault(require("./controllers/userController"));
var skillsRoute_1 = __importDefault(require("./routers/skillsRoute"));
var portfolioRoute_1 = __importDefault(require("./routers/portfolioRoute"));
var aboutMeRoute_1 = __importDefault(require("./routers/aboutMeRoute"));
var swaggerdocs_1 = __importDefault(require("./swagger/swaggerdocs"));
var handleInvalidUrl = invalidUrl_1.default.handleInvalidUrl;
var sendErrorDev = errorController_1.default.sendErrorDev;
var verifyUserEmail = userController_1.default.verifyUserEmail;
var app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: "*",
    methods: "*",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.status(200).json({
        status: "success",
        message: "welcome to my portfolio",
    });
});
app.use("/api/blogs", blogRouter_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/users", userRouter_1.default);
app.use("/api/users/:verifyId/verify/:verifyToken", verifyUserEmail);
app.use("/api/messages/", messageRoute_1.default);
app.use("/api/skills/", skillsRoute_1.default);
app.use("/api/aboutme/", aboutMeRoute_1.default);
app.use("/api/portfolio/", portfolioRoute_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerdocs_1.default));
app.use("*", handleInvalidUrl);
app.use(sendErrorDev);
// app.use("/.netlify/functions/index");
exports.default = app;
// module.exports.handler = serverless(app);
