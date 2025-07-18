import { NextFunction, Request, Response } from "express";

export const undefinedRoute = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Route not found") as any;
  error.statusCode = 404;
  error.isOperational = true;
  next(error);
};
