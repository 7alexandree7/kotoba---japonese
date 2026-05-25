import {Router} from "express";
import { testRouterAuth } from "../../controllers/auth.controller.js";

const router = Router();

router.get("/", testRouterAuth)


export default router;