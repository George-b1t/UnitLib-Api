import { Request, Response } from "express";
import { prismaClient } from "../../../prisma/prismaClient";
import { hashSync } from "bcryptjs";

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, password } = req.body;

    if (!name || !password) {
      throw new Error("Empty field");
    }

    await prismaClient.user.create({
      data: {
        name,
        password: hashSync(password, 8),
        isAdm: false,
      },
    });

    return res.json({
      message: "User created successfully",
    });
  }
}

export const userController = new UserController();
