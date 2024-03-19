"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var aboutMe_controller_1 = __importDefault(require("../controllers/aboutMe.controller"));
var aboutMeRouter = (0, express_1.Router)();
aboutMeRouter
    .get("/", aboutMe_controller_1.default.getAboutMe)
    .post("/", aboutMe_controller_1.default.createAboutMe)
    .patch("/:id", aboutMe_controller_1.default.updateAboutMe)
    .delete("/:id", aboutMe_controller_1.default.deleteAboutMe);
exports.default = aboutMeRouter;
