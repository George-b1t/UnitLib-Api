import { Request, Response } from "express";
import { prismaClient } from "../../../prisma/prismaClient";
import { unlink } from "fs";
import path from "path";

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
        AND: [
          {
            pdf_location: {
              not: null,
            },
          },
          {
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

  async removeBook(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const currentBook = await prismaClient.book.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!currentBook) {
      throw new Error("Book not found");
    }

    if (currentBook.pdf_location) {
      unlink(
        path.join(
          __dirname,
          "..",
          "..",
          "..",
          "storage",
          "content",
          `${currentBook.pdf_location}.pdf`
        ),
        () => {}
      );
    }

    await prismaClient.book.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({
      message: "Books deleted successfully",
    });
  }
}

export const bookController = new BookController();
