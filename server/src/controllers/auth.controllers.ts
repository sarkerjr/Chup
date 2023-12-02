import { Request, Response } from 'express';

import asyncHandler from '@/utils/error-handling/asyncHandler';
import userService from 'services/user.services';

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
