import { Router } from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { deleteAccount, getMyProfile, updateProfile } from '../../controllers/user.controller.js';
const router = Router();


router.get("/my-profile", verifyToken, getMyProfile);
router.put("/update-profile", verifyToken, updateProfile);
router.delete("/delete-account", verifyToken, deleteAccount);


export default router;