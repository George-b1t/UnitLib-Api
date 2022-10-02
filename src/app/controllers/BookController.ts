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

  async update(req: Request, res: Response): Promise<Response> {
    const { id, name, author, genre, description } = req.body;

    if (!id || !name || !author || !genre || !description) {
      throw new Error("Empty field");
    }

    await prismaClient.book.update({
      where: {
        id,
      },
      data: {
        name,
        author,
        genre,
        description,
      },
    });

    return res.json({
      message: "Book updated successfully",
    });
  }

  async showPendingBooks(req: Request, res: Response): Promise<Response> {
    const books = await prismaClient.book.findMany({
      where: {
        pdf_location: null,
      },
    });

    return res.json({
      message: "Books finded successfully",
      data: {
        books,
      },
    });
  }

  async searchBooks(req: Request, res: Response): Promise<Response> {
    const { value } = req.body;

    const books = await prismaClient.book.findMany({
      where: {
        OR: [
          {
            name: {
              contains: value,
            },
          },
          {
            author: {
              contains: value,
            },
          },
          {
            genre: {
              contains: value,
            },
          },
          {
            description: {
              contains: value,
            },
          },
        ],
      },
    });

    return res.json({
      message: "Books found successfully",
      data: {
        books,
      },
    });
  }
}

export const bookController = new BookController();
