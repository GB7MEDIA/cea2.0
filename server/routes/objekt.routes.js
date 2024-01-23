import express from 'express';
import {
  GetAllObjekteController,
  GetObjektByIdController,
  CreateObjektController,
  EditObjektByIdController,
  DeleteObjektByIdController,
} from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

const router = express.Router();

router.get('/objekte', verifyToken, GetAllObjekteController);
router.get('/objekte/:objekt_id', verifyToken, GetObjektByIdController);
router.post('/objekte/create', verifyToken, CreateObjektController);
router.put('/objekte/edit/:objekt_id', verifyToken, EditObjektByIdController);
router.delete('/objekte/delete/:objekt_id', verifyToken, DeleteObjektByIdController);

export const ObjektRoutes = router;
