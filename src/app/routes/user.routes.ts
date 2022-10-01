import { Router } from "express";
import { userController } from "../controllers/UserController";
import { authAdmMiddlewareController } from "../middlewares/AuthAmdMiddlwareController";

const userRoutes = Router();

userRoutes.post("/create", userController.create);
userRoutes.post(
  "/admin",
  authAdmMiddlewareController.execute,
  userController.addAdmin
);

export { userRoutes };
