import express from "express";
import {
    getAllNotes,
    getNoteById,
    deleteNote,
    createNote,
    updateNote,
    searchNotesByTitle
} from "../controllers/dailyNotesControllers.js";


const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.get("/search/:title", searchNotesByTitle);
router.delete("/:id", deleteNote);
router.post("/", createNote);    
router.put("/:id", updateNote);

export default router;