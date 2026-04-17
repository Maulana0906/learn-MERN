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

    return JSON.stringify({
        success : true,
        message : "Success get notes",
        data : dataSlice,
        meta : {
            page : checkPage,
            limit : Number(limit),
            total_notes : data.length,
            total_pages : Math.ceil(data.length / limit)
        }
        
    })
}

const checkPageNLimit = (page, limit) => {
     if((!page || page.length < 1) || (!limit || limit.length < 1)){
        throw new Error("Your page or limit is not complete", {statusCode : 400});
    }
}

export const getAllNotes = async (query) => {
    const {page, limit, search, sort} = query;
    checkPageNLimit(page, limit);
    const fileBuffer = await dailyNotesModels.getAllNotes();

    let data = JSON.parse(fileBuffer)

    if(search){
        const filtered = data.filter(e => {
            const eTitle = e.title.toLowerCase()

            if(eTitle === search || eTitle.includes(search)){
                return e;
            }
        })
        data = filtered;
    }
    if(sort){
        switch(sort){
            case "asc" : 
                data.sort((a,b) => a.title.localeCompare(b.title));
                break;
            case "desc" : 
                data.sort((a,b) => b.title.localeCompare(a.title));
                break;
            case "news" : 
                data.sort((a,b) => b.id - a.id);
                break;
            case "olds" :
                data.sort((a,b) => a.id - b.id);
                break;
        } 
    }

    return result(data, page, limit);
   
}

export const getNoteById = async (id) => {
    if(!id || id.length < 1){
        throw new Error("Your id is not complete", {statusCode : 400});
    }
    const pivotData = await dailyNotesModels.getNoteById(id);
    return pivotData
    
}

export const deleteNote = async (id, query) => {
    if(!id || id.length < 1){
        throw new Error("Your id is not complete", {statusCode : 400});
    }
    const {page, limit} = query;
    checkPageNLimit(page, limit);

    const fileBuffer = await dailyNotesModels.deleteNote(id);
    const data = JSON.parse(fileBuffer)
    
    return result(data, page, limit);
}

export const createNote = async (body, query) => {
    const {page, limit} = query;
    checkPageNLimit(page, limit);

    const title = body.title;
    const content = body.content;

    if((!title || title.length < 1) || (!content || content.length < 1)){
        throw new Error("Your data is not complete", {statusCode : 400});
    }

    const fileBuffer = await dailyNotesModels.createNote(body);
    const data = JSON.parse(fileBuffer)
    return result(data, page, limit)
    
}

export const updateNote = async (req) => {
    const {body, query} = req;
    const {page, limit} = query;
    checkPageNLimit(page, limit);

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

    const fileBuffer = await dailyNotesModels.updateNote(body);
    const data = JSON.parse(fileBuffer)
    return result(data, page, limit)
    
}

export const validationLogin = async (userData) => {
    if((!userData.username || userData.username.length < 1) || (!userData.password || userData.password.length < 1)){
        throw new Error("Your data is not complete", {statusCode : 400});
    }

    const fileeBuffer = await dailyNotesModels.getAllUser();
    const data = JSON.parse(fileeBuffer);

    const msgReturn = (type, msg) => {
        return JSON.stringify({
            success : type,
            message : msg
        })
    }

    const result = data.map(e => {
        if(e.username === userData.username){
            if(e.password === userData.password){
                return msgReturn(true, "Success login");
            }else{
                return msgReturn(false, "Password is wrong")
            }
        }
    })

    if(result.length < 1){
        return msgReturn(false, "User is not found")
    }else{
        return result ;
    }

}
// 1. masukan name benar pw slah   -> notif "pw salah"
// 2. masukan name salah pw salah  -> notif "user tidak ditemukan"
// 3. masukan name benar pw benar  -> notif "success"


// 1. kesalahan berada pada update note, ketika update note dengan 
// image baru seharusnya menghapus image lama tetapi ini tidak bisa 
// dan image baru nya masuk ke uploads tetapi tidak masuk kedata JSON

// 2. kesalah berada pada update note dengan image baru namun sebelumnya tidak ada image.
// nah akan terjadi error, file nya terupload di folder uploads tetapi tidak masuk ke data JSON

// solusi : pahamin benar" flow alur data mu.

