import { BaseError } from './baseError';

export interface AppError extends BaseError {
  statusCode: number;
  isOperational: boolean;
}