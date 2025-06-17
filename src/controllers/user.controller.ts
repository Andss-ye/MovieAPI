import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

// Importing middlewares
import createError from "http-errors";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return next(createError(400, 'Email and name are required'));
    }

    if (await userService.getUserByEmail(email)) {
        return next(createError(409, 'Email already exists'))
    }

    const user = await userService.createUser({ name, email });
    res.status(201).json({ user });
};
