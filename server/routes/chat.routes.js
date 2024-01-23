import express from 'express';
import {
  GetAllChatsController,
  GetChatByIdController,
  CreateChatController,
  EditChatByIdController,
  DeleteChatByIdController,
} from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

const router = express.Router();

router.get('/chats', verifyToken, GetAllChatsController);
router.get('/chats/:chat_id', verifyToken, GetChatByIdController);
router.post('/chats/create', verifyToken, CreateChatController);
router.put('/chats/edit/:chat_id', verifyToken, EditChatByIdController);
router.delete('/chats/delete/:chat_id', verifyToken, DeleteChatByIdController);

export const ChatRoutes = router;
