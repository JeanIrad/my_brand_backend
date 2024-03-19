"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var skills_controller_1 = __importDefault(require("../controllers/skills.controller"));
var authController_1 = __importDefault(require("../controllers/authController"));
var upload_1 = __importDefault(require("../middleware/upload"));
var skillsRouter = (0, express_1.Router)();
skillsRouter
    .route("/")
    .get(authController_1.default.protectRoutes, authController_1.default.checkAdmin, skills_controller_1.default.getAllSkills)
    .post(authController_1.default.protectRoutes, authController_1.default.checkAdmin, upload_1.default.single("image"), skills_controller_1.default.createSkill);
skillsRouter
    .route("/:id")
    .get(authController_1.default.protectRoutes, authController_1.default.checkAdmin, skills_controller_1.default.getSkill)
    .patch(authController_1.default.protectRoutes, authController_1.default.checkAdmin, skills_controller_1.default.updateSkill)
    .delete(authController_1.default.protectRoutes, authController_1.default.checkAdmin, skills_controller_1.default.deleteSkill);
exports.default = skillsRouter;
