import { NextFunction, Request, Response } from "express";

async function timer(req: Request, res: Response, next: NextFunction) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return next();
}

export { timer };
