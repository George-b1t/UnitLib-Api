import { Request, Response } from "express";
import { prismaClient } from "../../../prisma/prismaClient";

class RentController {
  async create(req: Request, res: Response): Promise<Response> {
    const { user_id, book_id } = req.body;

    if (!user_id || !book_id) {
      throw new Error("Empty field");
    }

    const bookExists = await prismaClient.book.findUnique({
      where: {
        id: book_id,
      },
    });

    if (!bookExists) {
      throw new Error("Book not found");
    }

    const userExists = await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!userExists) {
      throw new Error("User not found");
    }

    const alreadyRented = await prismaClient.rent.findFirst({
      where: {
        book_id,
        user_id,
      },
    });

    if (alreadyRented) {
      throw new Error("Book already rented");
    }

    const oldRentsQuantity = await prismaClient.rent.count({
      where: {
        book_id,
      },
    });

    if (bookExists.rent_limit === oldRentsQuantity) {
      throw new Error("Rent limit exceeded");
    }

    const newRent = await prismaClient.rent.create({
      data: {
        book_id,
        user_id,
      },
    });

    return res.json({
      message: "Rent created successfully",
    });
  }
}

export const rentController = new RentController();
