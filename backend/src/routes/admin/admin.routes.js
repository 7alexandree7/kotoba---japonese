import {Router} from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import {isAdmin} from "../../middlewares/isAdmin.js";
import { testAdminRoute, getAllUsers, updateUserRole, deleteAnyUser, getAllWords, deleteAnyWord } from "../../controllers/admin.controller.js";

const router = Router();

router.get("/test-admin", verifyToken, isAdmin, testAdminRoute);
router.get("/get-all-users", verifyToken, isAdmin, getAllUsers);
//router.get("/get-all-words", verifyToken, isAdmin, getAllWords);

router.put("/update-user-role/:userId", verifyToken, isAdmin, updateUserRole);

router.delete("/delete-any-user/:userId", verifyToken, isAdmin, deleteAnyUser);
//router.delete("/delete-any-word/:wordId", verifyToken, isAdmin, deleteAnyWord);


export default router;