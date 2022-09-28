import { Request, Response } from "express";

import multer from "multer";
import fs from "fs";

class StorageUploadPdfController {
  storage() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `./storage/content/`);
      },
      filename: (req, file, cb) => {
        cb(null, req.headers["file-name"] + ".pdf");
      },
    });

    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 10000000,
      },
    });

    return upload;
  }

  async handle(req: Request, res: Response) {
    const { file } = req;

    if (!file) return;

    return res.json({
      message: "Content uploaded successfully",
    });
  }
}

export const storageUploadPdfController = new StorageUploadPdfController();
