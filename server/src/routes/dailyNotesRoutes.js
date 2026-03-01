import express from "express";
import {
    getAllNotes,
    getNoteById,
    deleteNote,
    createNote,
    updateNote,
    searchNotesByTitle
} from "../controllers/dailyNotesControllers.js";

// middleware upload file with multer
import multer from "multer";
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "server/uploads/")
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})
const upload = multer({storage})


const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.get("/search/:title", searchNotesByTitle);
router.delete("/:id", deleteNote);
router.post("/", upload.single('image'), createNote);    
router.put("/:id", updateNote);

export default router;