import express from "express";
import cookieParser from "cookie-parser";
const app = express(); 
app.use(express.json()); 

import cors from "cors"; 
import dotenv from "dotenv";

app.use(cors()) 
app.use(cookieParser())
dotenv.config();


// dipertanyakan
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


import dailyNotesRoutes from "./src/routes/dailyNotesRoutes.js"
import authRoutes from "./src/routes/auth.routes.js"

app.use('/notes', dailyNotesRoutes) 
app.use("/users", authRoutes)


app.use((err, req, res, next) => {
     if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
               success: false,
               message: "File terlalu besar (max 2MB)"
          });  
     }

     return res.status(err.statusCode || 500).json({
          success : false,
          message : err.message,
          data : null
     })
})

app.listen(3000, () => {
     console.log("Server running on port 3000"); 
});

console.log("UPLOAD PATH:", process.cwd() + "/uploads");