import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import ApiError from '@/utils/error-handling/ApiError';

export default function (req: Request, _res: Response, next: NextFunction) {
  //Check if token exist
  const token = req.get('Authorization')?.split(' ')[1];

  if (!token) {
    throw new ApiError(401, 'ERR_UNAUTHORIZED', false, 'Token is missing');
  }

  // Verify Token
  return verify(token, process.env.JWT_SECRET_KEY!, (error, decoded: any) => {
    if (error?.name === 'TokenExpiredError') {
      throw new ApiError(401, 'ERR_UNAUTHORIZED', false, 'Token is expired');
    }

    //Check if token is valid
    if (error) {
      throw new ApiError(401, 'ERR_UNAUTHORIZED', false, 'Token is invalid');
    }

    //Passsing user information to request body
    req.body.user = decoded?.user;

    //Forwading to next middleware
    next();
  });
}
