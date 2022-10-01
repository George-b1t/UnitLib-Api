import { Request, Response } from "express";

import multer from "multer";
import { prismaClient } from "../../../prisma/prismaClient";

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
    const header: any = req.headers;
    const bookId: number = header["book-id"];
    const fileName: number = header["file-name"];

    console.log(fileName);

    if (!file || !fileName || !bookId) {
      throw new Error("Invalid file");
    }

    await prismaClient.book.update({
      where: {
        id: Number(bookId),
      },
      data: {
        pdf_location: String(fileName),
      },
    });

    return res.json({
      message: "Content uploaded successfully",
    });
  }
}

export const storageUploadPdfController = new StorageUploadPdfController();
