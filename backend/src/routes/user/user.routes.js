import { Router } from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { deleteAccount, getMyProfile } from '../../controllers/user.controller.js';
const router = Router();


router.get("/my-profile", verifyToken, getMyProfile);
router.delete("/delete-account", verifyToken, deleteAccount);


export default router;