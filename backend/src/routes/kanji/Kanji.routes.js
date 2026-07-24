import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { validate } from "../../middlewares/validateUser.js";
import { kanjiSchema } from "../../schema/kanji.schema.js";
import { createKanji } from "../../controllers/kanji.controller.js";

const router = Router();


router.post("/create-kanji", verifyToken, validate(kanjiSchema), createKanji);


export default router;