import express from 'express';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  listUsers
} from '../controllers/userController.js';
import {
  validateObjectId,
  validateRequiredFields,
  validateEnum,
  validatePagination
} from '../middleware/validators.js';

const router = express.Router();

// CREATE
router.post(
  '/',
  validateRequiredFields(['name', 'email']),
  validateEnum('role', ['admin', 'manager', 'developer', 'designer', 'tester']),
  createUser
);

// LIST
router.get(
  '/',
  validatePagination,
  listUsers
);

// READ
router.get(
  '/:id',
  validateObjectId(),
  getUserById
);

// UPDATE
router.put(
  '/:id',
  validateObjectId(),
  validateEnum('role', ['admin', 'manager', 'developer', 'designer', 'tester']),
  updateUser
);

// DELETE
router.delete(
  '/:id',
  validateObjectId(),
  deleteUser
);

export default router;
