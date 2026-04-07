import * as dailyNotesModels from "../models/dailyNotesModels.js";

export const getAllNotes = async () => {
    const result = await dailyNotesModels.getAllNotes();
    return result;
}

export const getNoteById = async (id) => {
    if(id.length < 1 && !id){
        throw new Error("Your data is not complete");
    }
    const result = await dailyNotesModels.getNoteById(id);
    return result;
}

export const deleteNote = async (id) => {
    if(id.length < 1 && !id){
        throw new Error("Your data is not complete");
    }
    const result = await dailyNotesModels.deleteNote(id);
    return result;
}

export const createNote = async (body) => {
    console.log(body)
    const title = body.title;
    const content = body.content;

    if((title.length < 1 && !title) || (content.length < 1 && !content)){
        throw new Error("Your data is not complete");
    }

    const result = await dailyNotesModels.createNote(body);
    return result;
}

export const updateNote = async (body) => {
    const title = body.title;
    const content = body.content;
    if((title.length < 1 && !title) || (content.length < 1 && !content)){
        throw new Error("Your data is not complete");
    }

    const result = await dailyNotesModels.updateNote(body);
    return result;
}
