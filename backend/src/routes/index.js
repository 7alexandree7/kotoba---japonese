import {Router} from "express";
import authRoutes from "./auth/auth.Routes.js";
import adminRoutes from "./admin/admin.routes.js";
import wordsRoutes from "./words/words.routes.js";


const router = Router();

const basePath = '/api/v1';

router.use(`${basePath}/auth`, authRoutes);
router.use(`${basePath}/admin`, adminRoutes);
router.use(`${basePath}/words`, wordsRoutes);

export default router;