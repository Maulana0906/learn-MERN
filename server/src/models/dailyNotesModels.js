import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_NOTES_PATH = path.join(__dirname, "../data/notes.json")

const getNotes = async () => {
    return await fs.promises.readFile(DATA_NOTES_PATH , "utf-8");
}

export const getAllNotes = async () => {
    const res = await getNotes();
    return res;
}

export const getNoteById = async (id) => {
    const res = await getNotes();
    const pivotData = JSON.parse(res)

    return JSON.stringify(pivotData.filter(e => e.id == id))
    
}

export const deleteNote = async (id) => {
    const res = await getNotes();
    const arrRes = JSON.parse(res)

    const find = arrRes.filter(e => Number(e.id) === id);
    
    if(find.length < 0){
        throw new Error("Note not found", {statusCode : 404});
    } 

    const result = JSON.stringify(arrRes.filter(e => Number(e.id) !== Number(id)), null, 2);
    await fs.promises.writeFile(DATA_NOTES_PATH ,result, 'utf-8')
    return true;
}

export const createNote = async (body) => {
    const res = await getNotes();
    const arrRes = await JSON.parse(res);

    const id = Math.max(...arrRes.map(e => e.id)) + 1;
    arrRes.push({
        id,
        title : body.title,
        content : body.content,
        image : body.image
    })
    await fs.promises.writeFile(DATA_NOTES_PATH , JSON.stringify(arrRes, null, 2), 'utf-8');
    return getNoteById(id);
}

export const updateNote = async (body) => {
    const notes = await getNotes();
    const parseNotes = await JSON.parse(notes);
    console.log(parseNotes)
    
    const find = parseNotes.filter(e => Number(e.id) === Number(body.id));

    if(!find){
         throw new Error("Note not found", {statusCode : 404})
    }

    const result = parseNotes.map(item => {
        if(Number(item.id) === Number(body.id)){
            return {...item, title : body.title, content : body.content, image : body.image}
        }
        return item;
    })

    await fs.promises.writeFile(DATA_NOTES_PATH , JSON.stringify(result, null, 2), 'utf-8');
    return getNoteById(body.id);
}

export const getAllUser = async () => {
    return fileBuffer = await fs.promises.readFile(DATA_USER_PATH, "utf-8");
} 