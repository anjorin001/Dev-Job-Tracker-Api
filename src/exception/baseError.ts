import { StatusCodes } from "http-status-codes";

export class BaseError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    statusCode: number,
    isOperational: boolean,
    description: string
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // Ensure correct prototype chain

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class ValidationError extends BaseError {
  constructor(description = "Invalid input") {
    super("ValidationError", StatusCodes.BAD_REQUEST, true, description);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(description = "Unauthorized access") {
    super("UnauthorizedError", StatusCodes.UNAUTHORIZED, true, description);
  }
}

export class NotFoundError extends BaseError {
  constructor(description = "Resource not found") {
    super("NotFoundError", StatusCodes.NOT_FOUND, true, description);
  }
}

export class ConflictError extends BaseError {
  constructor(description = "Conflict occurred") {
    super("ConflictError", StatusCodes.CONFLICT, true, description);
  }
}
