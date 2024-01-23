import express from 'express';
import {
  GetAllSchadenController,
  GetSchadenByIdController,
  CreateSchadenController,
  EditSchadenByIdController,
  DeleteSchadenByIdController,
} from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

const router = express.Router();

router.get('/schaden', verifyToken, GetAllSchadenController);
router.get('/schaden/:schaden_id', verifyToken, GetSchadenByIdController);
router.post('/schaden/create', verifyToken, CreateSchadenController);
router.put('/schaden/edit/:schaden_id', verifyToken, EditSchadenByIdController);
router.delete('/schaden/delete/:schaden_id', verifyToken, DeleteSchadenByIdController);

export const SchadenRoutes = router;
