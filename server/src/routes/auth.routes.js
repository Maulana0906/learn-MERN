import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
    loginController,
    logoutController,
    getMeController,
    registerController 
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", verifyToken, getMeController);
router.post("/register", registerController);
router.post

export default router;