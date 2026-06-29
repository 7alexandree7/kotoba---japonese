import { Router } from "express";
import { validate } from "../../middlewares/validateUser.js";
import { wordsSchema } from "../../schema/words.schema.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import {
    createWord,
    updateWord,
    deleteWord,
    getMyWords,
    getWordsById,
    searchMyWords,
    getMyFavoriteWords,
    toggleFavoriteWord,
    filterWords,
    reviewWord
} from "../../controllers/words.controller.js";


const router = Router();

router.post("/create-word", verifyToken, validate(wordsSchema), createWord);
router.put("/update-word/:id", verifyToken, validate(wordsSchema), updateWord);
router.delete("/delete-word/:id", verifyToken, deleteWord);

router.get("/get-my-words", verifyToken, getMyWords);

router.get("/get-my-favorite-words", verifyToken, getMyFavoriteWords);
router.patch("/toggle-favorite/:id", verifyToken, toggleFavoriteWord);

router.get("/get-word/:id", verifyToken, getWordsById);

router.get("/search-my-words", verifyToken, searchMyWords);
router.get("/filter-words", verifyToken, filterWords);

router.patch("/review-word/:id", verifyToken, reviewWord)

export default router;