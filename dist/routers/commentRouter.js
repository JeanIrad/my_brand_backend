"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
var authController_1 = __importDefault(require("../controllers/authController"));
var commentRouter = (0, express_1.Router)();
commentRouter
    .route("/")
    .get(authController_1.default.protectRoutes, authController_1.default.checkAdmin, comment_controller_1.default.getAllComments)
    .post(comment_controller_1.default.createComment);
commentRouter
    .route("/:id")
    .get(authController_1.default.protectRoutes, authController_1.default.checkAdmin, comment_controller_1.default.getComment)
    .patch(authController_1.default.protectRoutes, authController_1.default.checkAdmin, comment_controller_1.default.updateComment)
    .delete(authController_1.default.protectRoutes, authController_1.default.checkAdmin, comment_controller_1.default.deleteComment);
exports.default = commentRouter;