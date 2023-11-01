import { Prisma, prisma } from '@/utils/prisma';
import { User } from '@prisma/client';

/**
 * Create a new user
 * @returns The created user
 */
const createUser = async (
  user: Prisma.UserCreateInput,
  profile: Prisma.ProfileCreateInput
): Promise<User> => {
  return await prisma.user.create({
    data: {
      ...user,
      profile: {
        create: {
          ...profile,
        },
      },
    },
  });
};

/**
 * Get a user by id
 */
const getUser = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Get a user by email
 */
const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

/**
 * Get all users
 */
const getUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

/**
 * Update a user by id
 */
const updateUser = async (
  id: string,
  data: Prisma.UserUpdateInput
): Promise<User | null> => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

/**
 * Delete a user by id
 */
const deleteUser = async (id: string): Promise<User | null> => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

export default {
  createUser,
  getUser,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
};
