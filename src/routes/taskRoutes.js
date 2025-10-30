import express from 'express';
import {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  listTasks,
  getTasksByProject,
  addAttachment
} from '../controllers/taskController.js';
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
  validateRequiredFields(['title', 'project']),
  validateEnum('status', ['todo', 'in-progress', 'review', 'completed']),
  validateEnum('priority', ['low', 'medium', 'high', 'critical']),
  validateDates,
  validatePositiveNumber(['estimatedHours', 'actualHours']),
  createTask
);

// LIST
router.get(
  '/',
  validatePagination,
  listTasks
);

// Tasks por proyecto
router.get(
  '/project/:projectId',
  validateObjectId('projectId'),
  getTasksByProject
);

// READ
router.get(
  '/:id',
  validateObjectId(),
  getTaskById
);

// UPDATE
router.put(
  '/:id',
  validateObjectId(),
  validateEnum('status', ['todo', 'in-progress', 'review', 'completed']),
  validateEnum('priority', ['low', 'medium', 'high', 'critical']),
  validateDates,
  validatePositiveNumber(['estimatedHours', 'actualHours']),
  updateTask
);

// DELETE
router.delete(
  '/:id',
  validateObjectId(),
  deleteTask
);

// Attachments
router.post(
  '/:id/attachments',
  validateObjectId(),
  validateRequiredFields(['filename', 'url']),
  addAttachment
);

export default router;
