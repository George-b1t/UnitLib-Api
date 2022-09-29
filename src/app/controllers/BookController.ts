import { Request, Response } from "express";
import { prismaClient } from "../../../prisma/prismaClient";

class BookController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, author, genre, description } = req.body;

    if (!name || !author || !genre || !description) {
      throw new Error("Empty field");
    }

    await prismaClient.book.create({
      data: {
        name,
        author,
        genre,
        description,
      },
    });

    return res.json({
      message: "Book created successfully",
    });
  }
}

export const bookController = new BookController();
