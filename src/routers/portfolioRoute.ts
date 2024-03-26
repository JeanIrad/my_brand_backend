import { Router } from "express";
import PortfolioController from "../controllers/portfolio.controller";
import AuthController from "../controllers/authController";
import upload from "../middleware/upload";

const portfolioRouter = Router();

portfolioRouter
  .route("/")
  .get(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    PortfolioController.getAllPortfolios
  )
  .post(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    upload("portfolios", "image"),
    PortfolioController.createPortfolio
  );
portfolioRouter
  .route("/:id")
  .get(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    PortfolioController.getPortfolio
  )
  .patch(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    PortfolioController.updatePortfolio
  )
  .delete(
    AuthController.protectRoutes,
    AuthController.checkAdmin,
    PortfolioController.deletePortfolio
  );

export default portfolioRouter;
