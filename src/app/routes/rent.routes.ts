import { Router } from "express";
import { rentController } from "../controllers/RentController";
import { authMiddlewareController } from "../middlewares/AuthMiddlewareController";

const rentRoutes = Router();

rentRoutes.post(
  "/create",
  authMiddlewareController.execute,
  rentController.create
);

rentRoutes.delete(
  "/delete/:id",
  authMiddlewareController.execute,
  rentController.delete
);

export { rentRoutes };
