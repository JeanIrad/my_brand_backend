"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var message_controller_1 = __importDefault(require("../controllers/message.controller"));
var authController_1 = __importDefault(require("../controllers/authController"));
var messageRouter = (0, express_1.Router)();
messageRouter
    .route("/")
    .get(authController_1.default.protectRoutes, authController_1.default.checkAdmin, message_controller_1.default.getAllMessages)
    .post(message_controller_1.default.createMessage);
messageRouter
    .route("/:id")
    .get(authController_1.default.protectRoutes, authController_1.default.checkAdmin, message_controller_1.default.getMessage)
    .patch(message_controller_1.default.updateMessage)
    .delete(authController_1.default.protectRoutes, authController_1.default.checkAdmin, message_controller_1.default.deleteMessage);
exports.default = messageRouter;
