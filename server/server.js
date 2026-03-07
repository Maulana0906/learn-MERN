import express from "express";
const app = express(); 
app.use(express.json()); 

import cors from "cors"; 
app.use(cors()) 

// dipertanyakan
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


import dailyNotesRoutes from "./src/routes/dailyNotesRoutes.js"
app.use('/notes', dailyNotesRoutes) 

app.listen(3000, () => {
     console.log("Server running on port 3000"); 
});

console.log("UPLOAD PATH:", process.cwd() + "/uploads");