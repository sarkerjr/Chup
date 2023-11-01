import { Request, Response } from 'express';

import asyncHandler from '@/utils/error-handling/asyncHandler';
import userService from 'services/user.services';

/**
 * @description Create a new user
 */
export const createUserWithProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { user, profile } = req.body;

    await userService.createUser(user, profile);
    return res.status(201).json({ message: 'User created sucessfully' });
  }
);

/**
 * @description Get user by id
 */
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getUser(req.params.id);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

/**
 * @description Get user by email
 */
export const getUserByEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userService.getUserByEmail(req.params.email);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  }
);

/**
 * @description Get all users
 */
export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await userService.getUsers();
  return res.json(users);
});

/**
 * @description Update user by id
 */
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);

  if (updatedUser) {
    return res.json(updatedUser);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

/**
 * @description Delete user by id
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const deletedUser = await userService.deleteUser(req.params.id);
  if (deletedUser) {
    return res.json(deletedUser);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});
