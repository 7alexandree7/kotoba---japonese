import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { validate } from "../../middlewares/validateUser.js";
import {
    generateWordSchema,
    translateAiSchema,
} from "../../schema/ai.schema.js";
    
import {
    translate,
    generateWordWithAI
} from "../../controllers/ai.controller.js";


const router = Router();

router.post("/translate", verifyToken, validate(translateAiSchema), translate);
router.post("/generate-word-ai", verifyToken, validate(generateWordSchema), generateWordWithAI)


export default router;