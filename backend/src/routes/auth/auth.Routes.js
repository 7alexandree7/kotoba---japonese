import { Router } from "express";
import { testRouterAuth, signup, login, logout, verifyEmail, forgotPassword, resetPassword } from "../../controllers/auth.controller.js";
import { validate } from "../../middlewares/validateUser.js";
import { registerSchema, loginSchema, verifyEmailSchema } from "../../schema/userSchema.js";

const router = Router();

router.get("/", testRouterAuth)

router.post("/signup", validate(registerSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


export default router;