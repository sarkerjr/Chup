import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import asyncHandler from '@/utils/error-handling/asyncHandler';
import userService from 'services/user.services';
import authServices from '@/services/auth.services';

interface UserType {
  id: string;
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
  } | null;
}

/**
 * @description Login user
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authServices.login(email, password);

  if ('id' in user && 'profile' in user) {
    const token = sign(
      {
        user: {
          id: user.id,
          profileId: user?.profile?.id,
          firstName: user?.profile?.firstName,
          lastName: user?.profile?.lastName,
          gender: user?.profile?.gender,
        },
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: process.env.JWT_EXPIRE_TIME }
    );

    return res.status(200).json({ accessToken: token });
  }
});

/**
 * @description Register a new user with profile
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    await userService.createUser(data);
    return res.status(201).json({ message: 'User created sucessfully' });
  }
);
