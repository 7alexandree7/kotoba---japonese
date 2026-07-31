import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { validate } from "../../middlewares/validateUser.js";
import { translateAiSchema } from "../../schema/ai.schema.js";
import { translate } from "../../controllers/ai.controller.js";


const router = Router();

router.post("/translate", verifyToken, validate(translateAiSchema), translate);


export default router;