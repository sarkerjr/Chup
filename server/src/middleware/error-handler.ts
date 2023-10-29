import type { Request, Response, NextFunction } from 'express';

import ApiError from '@/utils/error-handling/ApiError';

const developmentErrors = (res: Response, error: ApiError) => {
  res.status(error.statusCode).json({
    error: {
      code: error.errorCode,
      message: error.message,
      details: error.details,
      stack: error.stack,
    },
  });
};

const productionErrors = (res: Response, error: ApiError) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      code: error.errorCode,
      message: error.message,
      details: error.details,
    });
  } else {
    res.status(error.statusCode).json({
      code: error.errorCode,
      message: 'An unexpected error occurred.',
    });
  }
};

/**
 * @description Catch errors and send response to client
 */
const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.errorCode = error.errorCode || 'ERR_INTERNAL_SERVER';

  if (process.env.NODE_ENV === 'development') {
    developmentErrors(res, error);
  } else {
    productionErrors(res, error);
  }
};

export default errorHandler;
