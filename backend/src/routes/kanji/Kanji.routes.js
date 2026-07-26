import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { validate } from "../../middlewares/validateUser.js";
import { kanjiSchema } from "../../schema/kanji.schema.js";
import {
    createKanji,
    updateKanji,
    deleteKanji,
    getKanji,
    getKanjiById,
    toggleFavoriteKanji,
    getFavoritesKanji,
    searchKanji,
    filterKanji

} from "../../controllers/kanji.controller.js";

const router = Router();


router.post("/create-kanji", verifyToken, validate(kanjiSchema), createKanji);
router.put("/update-kanji/:id", verifyToken, validate(kanjiSchema), updateKanji);
router.delete("/delete-kanji/:id", verifyToken, deleteKanji);

router.get("/get-all-kanji", verifyToken , getKanji);
router.get("/get-kanji/:id", verifyToken , getKanjiById);

router.patch("/toggle-favorite/:id", verifyToken, toggleFavoriteKanji);
router.get("/get-my-favorites-kanji", verifyToken, getFavoritesKanji);

router.get("/search-kanji", verifyToken, searchKanji);
router.get("/filter-kanji", verifyToken, filterKanji);


export default router;