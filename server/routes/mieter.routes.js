import express from 'express';
import {
  GetAllMieterController,
  GetMieterByIdController,
  CreateMieterController,
  EditMieterByIdController,
  DeleteMieterByIdController,
} from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

const router = express.Router();

router.get('/mieter', verifyToken, GetAllMieterController);
router.get('/mieter/:mieter_id', verifyToken, GetMieterByIdController);
router.post('/mieter/create', verifyToken, CreateMieterController);
router.put('/mieter/edit/:mieter_id', verifyToken, EditMieterByIdController);
router.delete('/mieter/delete/:mieter_id', verifyToken, DeleteMieterByIdController);

export const MieterRoutes = router;
