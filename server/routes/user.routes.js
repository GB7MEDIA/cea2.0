import express from 'express';
import {
  GetAllUsersController,
  GetUserByIdController,
  CreateUserController,
  EditUserByIdController,
  DeleteUserByIdController,
} from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

import { 
  validateCreateUser,
  validateEditUserById,
  checkValidationResult
} from '../middlewares/validation.middleware.js';

const router = express.Router();

router.get('/users', verifyToken, GetAllUsersController);
router.get('/users/:user_id', verifyToken, GetUserByIdController);
router.post('/users/create', verifyToken, validateCreateUser, checkValidationResult, CreateUserController);
router.put('/users/edit/:user_id', verifyToken, validateEditUserById, checkValidationResult, EditUserByIdController);
router.delete('/users/delete/:user_id', verifyToken, DeleteUserByIdController);

export const UserRoutes = router;
