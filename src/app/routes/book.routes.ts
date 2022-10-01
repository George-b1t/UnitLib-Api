import { Router } from "express";
import { bookController } from "../controllers/BookController";
import { storageUploadPdfController } from "../controllers/StorageUploadPdfController";
import { authAdmMiddlewareController } from "../middlewares/AuthAmdMiddlwareController";

const bookRoutes = Router();

bookRoutes.post(
  "/upload",
  authAdmMiddlewareController.execute,
  storageUploadPdfController.storage().single("file"),
  storageUploadPdfController.handle
);

bookRoutes.post(
  "/create",
  authAdmMiddlewareController.execute,
  bookController.create
);

bookRoutes.get(
  "/pending",
  authAdmMiddlewareController.execute,
  bookController.showPendingBooks
);

export { bookRoutes };
