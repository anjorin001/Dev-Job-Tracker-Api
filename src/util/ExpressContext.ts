import { Request, Response, NextFunction } from "express";

export interface ExpressContext {
  req: Request;
  res: Response;
  next: NextFunction;
}
