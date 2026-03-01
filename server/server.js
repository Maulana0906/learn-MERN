import express from "express";
const app = express(); 
app.use(express.json()); 

import cors from "cors"; 
app.use(cors()) 

import dailyNotesRoutes from "./src/routes/dailyNotesRoutes.js"
app.use('/notes', dailyNotesRoutes) 

// dipertanyakan
import path from "path";
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.listen(3000, () => {
     console.log("Server running on port 3000"); 
});
