import express from "express";
import {
    getAllNotes,
    getNoteById,
    deleteNote,
    createNote,
    updateNote
} from "../controllers/dailyNotesControllers.js";


const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.delete("/:id", deleteNote);
router.post("/", createNote);    
router.put("/:id", updateNote);

export default router;