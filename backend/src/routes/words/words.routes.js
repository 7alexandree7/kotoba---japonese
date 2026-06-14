import { Router } from "express";
import { validate } from "../../middlewares/validateUser.js";
import { wordsSchema } from "../../schema/words.schema.js";
import {verifyToken} from "../../middlewares/verifyToken.js";
import { createWord, updateWord, deleteWord } from "../../controllers/words.controller.js";


const router = Router();

router.post("/create-word", verifyToken, validate(wordsSchema), createWord);
router.put("/update-word/:id", verifyToken, validate(wordsSchema), updateWord);
router.delete("/delete-word/:id", verifyToken, deleteWord);

export default router;