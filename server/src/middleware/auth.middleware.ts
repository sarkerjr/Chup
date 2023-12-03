import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export default function (req: Request, res: Response, next: NextFunction) {
  //Check if token exist
  const token = req.get('Authorization');
  if (!token) {
    return res.status(401).send({
      message: 'Access denied. No token provided.',
    });
  }

  // Verify Token
  return verify(token, process.env.JWT_SECRET_KEY!, (error, decoded: any) => {
    if (error?.name === 'TokenExpiredError') {
      return res.status(401).send({
        message: 'Token expired',
      });
    }

    //Check if token is valid
    else if (error) {
      return res.status(401).send({
        message: 'Token is invalid',
      });
    }

    //Passsing user information to request body
    req.body.tokenInfo = {
      userId: decoded?.userId,
      hallId: decoded?.hallId,
      role: decoded?.role,
    };

    //Forwading to next middleware
    next();
  });
}
