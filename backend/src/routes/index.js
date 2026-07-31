import {Router} from "express";
import authRoutes from "./auth/auth.Routes.js";
import adminRoutes from "./admin/admin.routes.js";
import wordsRoutes from "./words/words.routes.js";
import userRoutes from "./user/user.routes.js";
import sentencesRoutes from "../routes/sentences/sentences.routes.js";
import kanjiRoutes from "../routes/kanji/Kanji.routes.js";
import aiRoutes from "../routes/ai/ai.routes.js";


const router = Router();

const basePath = '/api/v1';

router.use(`${basePath}/auth`, authRoutes);
router.use(`${basePath}/admin`, adminRoutes);
router.use(`${basePath}/words`, wordsRoutes);
router.use(`${basePath}/user`, userRoutes);
router.use(`${basePath}/sentences`, sentencesRoutes);
router.use(`${basePath}/kanji`, kanjiRoutes);
router.use(`${basePath}/ai`, aiRoutes);

export default router;