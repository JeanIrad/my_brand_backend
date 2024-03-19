"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// implement authentication routes right here!
var express_1 = require("express");
var authController_1 = __importDefault(require("./../controllers/authController"));
var authRoute = (0, express_1.Router)();
authRoute.post("/signup", authController_1.default.signup);
authRoute.post("/login", authController_1.default.login);
exports.default = authRoute;
