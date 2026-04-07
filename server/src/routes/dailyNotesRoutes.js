import express from "express";
import {
    getAllNotes,
    getNoteById,
    deleteNote,
    createNote,
    updateNote
} from "../controllers/dailyNotesControllers.js";

// middleware upload file with multer
import multer from "multer";
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "server/uploads/")
    },
    filename : (req, file, cb) => {
        cb(null, + Date.now() + "-" + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes= ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"]

    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }else {
        cb(new Error("File must be an image"));
    }
} 

const upload = multer({storage, fileFilter})


const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.delete("/:id", deleteNote);
router.post("/", upload.single('image'), createNote);    
router.put("/:id", upload.single('image'), updateNote);


export default router;