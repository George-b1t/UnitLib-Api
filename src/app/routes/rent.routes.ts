import { Router } from "express";
import { rentController } from "../controllers/RentController";
import { userController } from "../controllers/UserController";
import { authAdmMiddlewareController } from "../middlewares/AuthAmdMiddlwareController";
import { authMiddlewareController } from "../middlewares/AuthMiddlewareController";

const rentRoutes = Router();

rentRoutes.post(
  "/create",
  authMiddlewareController.execute,
  rentController.create
);

export { rentRoutes };
