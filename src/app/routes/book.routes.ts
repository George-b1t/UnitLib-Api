import { Router } from "express";
import { bookController } from "../controllers/BookController";
import { storageUploadCapeController } from "../controllers/StorageUploadCapeController";
import { storageUploadPdfController } from "../controllers/StorageUploadPdfController";
import { authAdmMiddlewareController } from "../middlewares/AuthAmdMiddlwareController";
import { authMiddlewareController } from "../middlewares/AuthMiddlewareController";

const bookRoutes = Router();

bookRoutes.post(
  "/upload/content",
  authAdmMiddlewareController.execute,
  storageUploadPdfController.storage().single("file"),
  storageUploadPdfController.handle
);

bookRoutes.post(
  "/upload/cape",
  authAdmMiddlewareController.execute,
  storageUploadCapeController.storage().single("file"),
  storageUploadCapeController.handle
);

bookRoutes.post(
  "/create",
  authAdmMiddlewareController.execute,
  bookController.create
);

bookRoutes.post(
  "/update",
  authAdmMiddlewareController.execute,
  bookController.update
);

bookRoutes.get(
  "/pending",
  authAdmMiddlewareController.execute,
  bookController.showPendingBooks
);

bookRoutes.post(
  "/search",
  authMiddlewareController.execute,
  bookController.searchBooks
);

bookRoutes.delete(
  "/delete/:id",
  authMiddlewareController.execute,
  bookController.removeBook
);

export { bookRoutes };
