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

  async addAdmin(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const user = await prismaClient.user.findUnique({
      where: {
        name,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isAdm) {
      throw new Error("User is already admin");
    }

    await prismaClient.user.update({
      where: {
        name,
      },
      data: {
        isAdm: true,
      },
    });

    return res.json({
      message: "User changed to admin successfully",
    });
  }
}

export const userController = new UserController();
