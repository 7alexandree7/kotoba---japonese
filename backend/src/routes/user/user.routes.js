import { Router } from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { deleteAccount } from '../../controllers/user.controller.js';
const router = Router();

router.delete("/delete-account", verifyToken, deleteAccount);


export default router;