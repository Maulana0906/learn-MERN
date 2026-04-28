import express from "express";
import {
    getAllNotes,
    getNoteById,
    deleteNote,
    createNote,
    updateNote,
    validationLogin
} from "../controllers/dailyNotesControllers.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_PATH = path.join(__dirname, "../../uploads/")

// middleware upload file with multer
import multer from "multer";
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, DATA_PATH)
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
const sizeLimit = 1024 * 1024 * 2;

const upload = multer({storage, fileFilter, limits : {fileSize : sizeLimit}})


const router = express.Router();

router.get("/login", validationLogin);
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.delete("/:id", deleteNote);
router.post("/", upload.single('image'), createNote);    
router.put("/", upload.single('image'), updateNote);


export default router;