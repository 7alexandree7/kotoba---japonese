import {Router} from "express";
import { createSentence, updateSentece } from "../../controllers/sentences.controller";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { validate } from "../../middlewares/validateUser.js";
import { sentecesSchema} from "../../schema/sentences.schema.js";

const router = Router();

router.post("/create-sentence", verifyToken, validate(sentecesSchema), createSentence);
router.put("/update-sentence/:id", verifyToken, validate(sentecesSchema), updateSentece);


export default router;