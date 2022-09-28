import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import { router } from "./app/routes";

import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(
  "/storage/content",
  express.static(path.join(__dirname, "..", "storage", "content"))
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    message: err.message,
  });
});

app.listen(3333, () => {
  console.log("Server running on port 3333!");
});
