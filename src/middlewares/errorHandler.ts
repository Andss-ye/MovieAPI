import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.type("application/json");
  const status = err.statusCode || 500;
  const message = err.message || "Error del servidor";
  res.status(status).json({
    message,
    error: process.env.NODE_ENV === "production" ? undefined : err.stack,
    zodErrors: err.zodErrors || undefined,
  });
}
