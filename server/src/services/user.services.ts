import { Prisma, prisma } from '@/utils/prisma';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

import ValidationError from '@/utils/error-handling/ValidationError';

interface CreateUserWithProfileType
  extends Prisma.UserCreateInput,
    Prisma.ProfileCreateInput {}

/**
 * Create a new user
 * @returns The created user
 */
const createUser = async (data: CreateUserWithProfileType): Promise<User> => {
  // Hash the password
  data.password = await hash(data.password, parseInt(process.env.SALT_ROUNDS!));

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    throw new ValidationError([
      { field: 'email', message: 'Email already exists' },
    ]);
  }

  return await prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      profile: {
        create: {
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
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
