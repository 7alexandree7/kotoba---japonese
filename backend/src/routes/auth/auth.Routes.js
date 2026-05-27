import {Router} from "express";
import { testRouterAuth, signup } from "../../controllers/auth.controller.js";

const router = Router();

router.get("/", testRouterAuth)
router.post("/signup", signup);


export default router;