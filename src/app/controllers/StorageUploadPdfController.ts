import { Request, Response } from "express";
import { unlink } from "fs";
import path from "path";

import multer from "multer";
import { prismaClient } from "../../../prisma/prismaClient";

class StorageUploadPdfController {
  storage() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `./storage/content/`);
      },
      filename: (req, file, cb) => {
        cb(
          null,
          String(req.headers["file-name"]).split(" ").join("_") + ".pdf"
        );
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

    if (!file || !fileName || !bookId) {
      throw new Error("Invalid file");
    }

    const findedBook = await prismaClient.book.findUnique({
      where: {
        id: Number(bookId),
      },
    });

    if (!findedBook) {
      throw new Error("Book not found");
    }

    const fileNameLocal = String(req.headers["file-name"]).split(" ").join("_");

    if (fileNameLocal !== findedBook.pdf_location) {
      unlink(
        path.join(
          __dirname,
          "..",
          "..",
          "..",
          "storage",
          "content",
          `${findedBook.pdf_location}.pdf`
        ),
        () => {}
      );
    }

    await prismaClient.book.update({
      where: {
        id: Number(bookId),
      },
      data: {
        pdf_location: fileNameLocal,
      },
    });

    return res.json({
      message: "Content uploaded successfully",
    });
  }
}

export const storageUploadPdfController = new StorageUploadPdfController();
