import type { Request, Response, NextFunction } from 'express';

import ValidationError from '@/utils/error-handling/ValidationError';
import InternalError from '@/utils/error-handling/InternalError';

/**
 * @description Catch errors and send response to client
 */
export default (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({
      error: {
        code: err.errorCode,
        message: err.message,
        details: err.details,
      },
    });
  } else if (err instanceof InternalError) {
    console.log('Reached!');
    res.status(err.statusCode).json({
      error: {
        code: err.errorCode,
        message: err.message,
      },
    });
  } else {
    res.status(500).json({
      error: {
        code: 'ERR_INTERNAL',
        message: 'Internal server error.',
      },
    });
  }
};
