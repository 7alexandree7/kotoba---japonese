import { Router } from "express";
import {
    createSentence,
    getMySentences,
    updateSentece,
    deleteSentence,
    getMySentences,
    getMySentenceById,
    searchMySentences,
    filterSentences,
    toggleFavoriteSentence,
    getMySentences,
    reviewSentence
}
    from "../../controllers/sentences.controller";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { validate } from "../../middlewares/validateUser.js";
import { sentecesSchema } from "../../schema/sentences.schema.js";

const router = Router();

router.post("/create-sentence", verifyToken, validate(sentecesSchema), createSentence);
router.put("/update-sentence/:id", verifyToken, validate(sentecesSchema), updateSentece);
router.delete("/delete-sentence/:id", verifyToken, deleteSentence);

router.get("/get-all-my-sentences", verifyToken, getMySentences);
router.get("/get-sentence/:id", verifyToken, getMySentenceById);

router.get("/search-sentences", verifyToken, searchMySentences);
router.get("/filter-sentences", verifyToken, filterSentences);

router.patch("toogle-favorite/:id", verifyToken, toggleFavoriteSentence);
router.get("/get-my-favorite-sentences", verifyToken, getMySentences);

router.patch("/review-sentence/:id", verifyToken, reviewSentence);
export default router;