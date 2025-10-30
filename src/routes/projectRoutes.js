import express from 'express';
import {
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  listProjects,
  addTeamMember,
  removeTeamMember
} from '../controllers/projectController.js';
import {
  validateObjectId,
  validateRequiredFields,
  validateEnum,
  validateDates,
  validatePositiveNumber,
  validatePagination
} from '../middleware/validators.js';

const router = express.Router();

// CREATE
router.post(
  '/',
  validateRequiredFields(['name', 'owner']),
  validateEnum('status', ['planning', 'active', 'on-hold', 'completed', 'cancelled']),
  validateDates,
  validatePositiveNumber(['budget']),
  createProject
);

// LIST
router.get(
  '/',
  validatePagination,
  listProjects
);

// READ
router.get(
  '/:id',
  validateObjectId(),
  getProjectById
);

// UPDATE
router.put(
  '/:id',
  validateObjectId(),
  validateEnum('status', ['planning', 'active', 'on-hold', 'completed', 'cancelled']),
  validateDates,
  validatePositiveNumber(['budget']),
  updateProject
);

// DELETE
router.delete(
  '/:id',
  validateObjectId(),
  deleteProject
);

// Team members
router.post(
  '/:id/members',
  validateObjectId(),
  validateRequiredFields(['userId']),
  validateEnum('role', ['manager', 'developer', 'designer', 'tester']),
  addTeamMember
);

router.delete(
  '/:id/members/:userId',
  validateObjectId(),
  validateObjectId('userId'),
  removeTeamMember
);

export default router;
