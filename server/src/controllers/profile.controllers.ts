import { Request, Response } from 'express';

import asyncHandler from '@/utils/error-handling/asyncHandler';
import profileService from 'services/profile.services';

/**
 * @description Create a new profile
 */
export const createProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await profileService.createProfile(req.body);
    return res.status(201).json(profile);
  }
);

/**
 * @description Get profile by id
 */
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const profile = await profileService.getProfile(req.params.id);
  if (profile) {
    return res.json(profile);
  } else {
    return res.status(404).json({ message: 'Profile not found' });
  }
});

/**
 * @description Get all profiles
 */
export const getProfiles = asyncHandler(
  async (_req: Request, res: Response) => {
    const profiles = await profileService.getProfiles();
    return res.json(profiles);
  }
);

/**
 * @description Update profile by id
 */
export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedProfile = await profileService.updateProfile(
      req.params.id,
      req.body
    );

    if (updatedProfile) {
      return res.json(updatedProfile);
    } else {
      return res.status(404).json({ message: 'Profile not found' });
    }
  }
);

/**
 * @description Delete profile by id
 */
export const deleteProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const deletedProfile = await profileService.deleteProfile(req.params.id);
    if (deletedProfile) {
      return res.json(deletedProfile);
    } else {
      return res.status(404).json({ message: 'Profile not found' });
    }
  }
);
