import { AppError } from '../exception/appError';
import { sendError } from '../util/responseHandler';
import { Request, Response, NextFunction} from "express";

export const errorHandler = async (err: AppError, req: Request, res: Response, next: NextFunction) => {
 console.error(err.stack);
  const status = err.isOperational
    ? err.statusCode || 500
    : 500;

  const message = err.isOperational
    ? err.message
    : "Internal Server Error";

  return sendError(res, message, status);
}