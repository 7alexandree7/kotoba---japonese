import { Router } from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { deleteAccount, getMyProfile, updateProfile, changePassword } from '../../controllers/user.controller.js';
import {validate} from "../../middlewares/validateUser.js"
import { changePasswordSchema } from '../../schema/userSchema.js';
const router = Router();


router.get("/my-profile", verifyToken, getMyProfile);
router.put("/update-profile", verifyToken, updateProfile);
router.delete("/delete-account", verifyToken, deleteAccount);
router.put("/change-password", verifyToken, validate(changePasswordSchema), changePassword);


export default router;