import express from 'express';
import {
  createProfile,
  getProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
} from 'controllers/profile.controllers';

const router = express.Router();

router.post('/', createProfile);

router.get('/:id', getProfile);

router.get('/', getProfiles);

router.put('/:id', updateProfile);

router.delete('/:id', deleteProfile);

export default router;
