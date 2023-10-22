import { Prisma, prisma } from '@/utils/prisma';
import { Profile } from '@prisma/client';

/**
 * Create a new profile
 * @returns The created profile
 */
const createProfile = async (
  data: Prisma.ProfileCreateInput
): Promise<Profile> => {
  return await prisma.profile.create({
    data,
  });
};

/**
 * Get a profile by id
 */
const getProfile = async (id: string): Promise<Profile | null> => {
  return await prisma.profile.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Get all profiles
 */
const getProfiles = async (): Promise<Profile[]> => {
  return await prisma.profile.findMany();
};

/**
 * Update a profile by id
 */
const updateProfile = async (
  id: string,
  data: Prisma.ProfileUpdateInput
): Promise<Profile | null> => {
  return await prisma.profile.update({
    where: {
      id,
    },
    data,
  });
};

/**
 * Delete a profile by id
 */
const deleteProfile = async (id: string): Promise<Profile | null> => {
  return await prisma.profile.delete({
    where: {
      id,
    },
  });
};

export default {
  createProfile,
  getProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
};
