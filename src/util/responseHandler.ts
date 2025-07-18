// src/utils/response.ts

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data?: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: any;
  statusCode?: any;
}

export const sendSuccess = <T>(
  res: any,
  message: string,
  statusCode = 200,
  data?: T,
) => {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: any,
  message: string,
  statusCode = 400,
  errors?: any
) => {
  const response: ErrorResponse = {
    success: false,
    message,
    errors,
    statusCode,
  };
  return res.status(statusCode).json(response);
};
