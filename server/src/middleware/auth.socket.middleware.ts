import { Socket } from 'socket.io';
import { verify, JwtPayload } from 'jsonwebtoken';
import ApiError from '@/utils/error-handling/ApiError';

// Define an interface for the decoded token
interface DecodedToken extends JwtPayload {
  user: {
    id: string;
    profileId: string;
    firstName: string;
    lastName: string;
    gender: string;
  };
}

// Socket.IO authentication middleware
export default function (socket: Socket, next: (err?: ApiError) => void): void {
  // Extract the token from the socket handshake query
  const token = socket.handshake.auth.token as string;

  if (!token) {
    return next(
      new ApiError(401, 'ERR_UNAUTHORIZED', true, 'Token is missing')
    );
  }

  // Verify Token
  return verify(
    token.split(' ')[1],
    process.env.JWT_SECRET_KEY!,
    (error, decoded) => {
      if (error?.name === 'TokenExpiredError') {
        return next(
          new ApiError(401, 'ERR_UNAUTHORIZED', true, 'Token is expired')
        );
      }

      // Check if token is valid
      if (error) {
        return next(
          new ApiError(401, 'ERR_UNAUTHORIZED', true, 'Token is invalid')
        );
      }

      // Passing user information to socket for use in connection
      socket.data.user = (decoded as DecodedToken).user;

      // Forwarding to next middleware
      next();
    }
  );
}
