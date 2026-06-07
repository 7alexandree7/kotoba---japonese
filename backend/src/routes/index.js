import {Router} from "express";
import authRoutes from "./auth/auth.Routes.js";
import adminRoutes from "./admin/admin.routes.js";


const router = Router();

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/admin', adminRoutes);

export default router;