"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var portfolio_controller_1 = __importDefault(require("../controllers/portfolio.controller"));
var authController_1 = __importDefault(require("../controllers/authController"));
var upload_1 = __importDefault(require("../middleware/upload"));
var portfolioRouter = (0, express_1.Router)();
portfolioRouter
    .route("/")
    .get(authController_1.default.protectRoutes, authController_1.default.checkAdmin, portfolio_controller_1.default.getAllPortfolios)
    .post(authController_1.default.protectRoutes, authController_1.default.checkAdmin, (0, upload_1.default)("portfolios", "image"), portfolio_controller_1.default.createPortfolio);
portfolioRouter
    .route("/:id")
    .get(authController_1.default.protectRoutes, authController_1.default.checkAdmin, portfolio_controller_1.default.getPortfolio)
    .patch(authController_1.default.protectRoutes, authController_1.default.checkAdmin, portfolio_controller_1.default.updatePortfolio)
    .delete(authController_1.default.protectRoutes, authController_1.default.checkAdmin, portfolio_controller_1.default.deletePortfolio);
exports.default = portfolioRouter;
