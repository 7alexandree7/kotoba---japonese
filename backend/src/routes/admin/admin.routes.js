import {Router} from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import {isAdmin} from "../../middlewares/isAdmin.js";
import { testAdminRoute } from "../../controllers/admin.controller.js";

const router = Router();

router.get("/test-admin", verifyToken, isAdmin, testAdminRoute);

export default router;