import { Request, Response, NextFunction } from "express";
import { createUserService } from "../services/user.service";

//importing middlewares
import createError from "http-errors";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return next(createError(400, 'Email and name are required'));
    }

    const user = await createUserService({ name, email });
    res.status(201).json({ user });
  } catch (error: any) {
    if (error.code === "P2002") {
      return next(createError(409, 'Email already exists'))
    }
    return next(createError(500, 'Error creating user'))
  }
};
