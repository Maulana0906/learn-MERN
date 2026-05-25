import * as dailyNotesModels from "../models/dailyNotesModels.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const result = (data, page, limit) => {
    const startIndex = (page - 1) *limit;
    const endIndex = page * limit;

    const checkPage = data.length < 1 ? 0 : Number(page);
    const dataSlice = data.slice(startIndex, endIndex);

    return{
        success : true,
        message : "Success get notes",
        data : dataSlice,
        meta : {
            page : checkPage,
            limit : Number(limit),
            total_notes : data.length,
            total_pages : Math.ceil(data.length / limit)
        }
        
    }
}

const checkPageNLimit = (page, limit) => {
     if((!page || page.length < 1) || (!limit || limit.length < 1)){
        throw new Error("Your page or limit is not complete", {statusCode : 400});
    }
}

export const getAllNotes = async (query) => {
    const {page = 1, 
        limit = 5,
        search = "",
        sort = ""
    } = query;

    const request = await dailyNotesModels.getAllNotes();

    let notes = JSON.parse(request)

    if(search !== "" && search !== undefined){
        const filtered = notes.filter(e => {
            const eTitle = e.title.toLowerCase()

            if(eTitle === search || eTitle.includes(search)){
                return e;
            }
        })
        notes = filtered;
    }
    if(sort !== "" && sort !== undefined){
        switch(sort){
            case "asc" : 
                notes.sort((a,b) => a.title.localeCompare(b.title));
                break;
            case "desc" : 
                notes.sort((a,b) => b.title.localeCompare(a.title));
                break;
            case "newest" : 
                notes.sort((a,b) => b.id - a.id);
                break;
            case "olds" :
                notes.sort((a,b) => a.id - b.id);
                break;
        } 
    }

    return result(notes, page, limit);
}

export const getNoteById = async (id) => {
    if(!id || id.length < 1){
        throw new Error("Your id is not complete", {statusCode : 400});
    }
    const pivotData = await dailyNotesModels.getNoteById(id);
    return pivotData
    
}

export const deleteNote = async (id) => {
    if(!id || id.length < 1){
        throw new Error("Your id is not complete", {statusCode : 400});
    }
    const existingNote = await getNoteById(id);
    const parseExistingNote = JSON.parse(existingNote);
    
    await dailyNotesModels.deleteNote(id);
    const filePath = path.join(__dirname, "../../uploads/"+parseExistingNote[0].image);
        
    try{
        fs.promises.unlink(filePath);
    }catch(err){
        throw new Error("Try again", {statusCode : 500})
    }

    return {
        "success" : true,
        "message" : "Note deleted successfully",
    }
}

export const createNote = async (body) => {

    const title = body.title;
    const content = body.content;

    if((!title || title.length < 1) || (!content || content.length < 1)){
        throw new Error("Your data is not complete", {statusCode : 400});
    }

    const req = await dailyNotesModels.createNote(body);
    const note = JSON.parse(req);
    return {
        "success" : true,
        "message" : "Note created successfully",
        "data" : note
    };
        
}

export const updateNote = async (req) => {
    const {body} = req;

    const title = body.title;
    const content = body.content;
    

    if((!title || title.length < 1) || (!content || content.length < 1)){
        throw new Error("Your data is not complete", {statusCode : 400});
    }

    const existingNote = await getNoteById(body.id);
    const parseExistingNote = JSON.parse(existingNote);

    body.image = req.file ? req.file.filename : parseExistingNote[0].image;

    if(req.file && parseExistingNote[0].image && parseExistingNote[0].image.length > 0){
        const filePath = path.join(__dirname, "../../uploads/"+parseExistingNote[0].image );
        
        try{
            fs.promises.unlink(filePath);
        }catch(err){
            throw new Error("Try again", {statusCode : 500})
        }
    }

    const request = await dailyNotesModels.updateNote(body);
    const note = JSON.parse(request)
    return {
        "success" : true,
        "message" : "Note updated successfully",
        "data" : note
    };
    
}



