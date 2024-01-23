import express from 'express';

import { AuthRoutes } from './auth.routes.js';
import { UserRoutes } from './user.routes.js';
import { MieterRoutes } from './mieter.routes.js';
import { ObjektRoutes } from './objekt.routes.js';
import { SchadenRoutes } from './schaden.routes.js';
import { ChatRoutes } from './chat.routes.js';

// Create a router instance
const router = express.Router();

// Define routes
router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);
router.use('/mieter', MieterRoutes);
router.use('/objekte', ObjektRoutes);
router.use('/schaden', SchadenRoutes);
router.use('/chats', ChatRoutes);

// Export the router
export default router;
