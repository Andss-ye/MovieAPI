import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import createError from 'http-errors';

export const validateSchema = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const error = createError(400, 'Datos inválidos.');
    (error as any).zodErrors = result.error.errors.map((error) => ({
      path: error.path,
      message: error.message,
    }));
    return next(error);
  }
  req.body = result.data;
  next();
};