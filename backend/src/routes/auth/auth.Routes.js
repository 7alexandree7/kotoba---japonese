import {Router} from "express";
import { testRouterAuth, signup, login, logout, verifyEmail, forgotPassword } from "../../controllers/auth.controller.js";

const router = Router();

router.get("/", testRouterAuth)

router.post("/signup", signup);
router.post("/login", login);
router.post ("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);


export default router;