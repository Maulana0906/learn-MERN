import * as dailyNotesService from  "../services/dailyNotesService.js";

export const getAllNotes = async (req,res, next) => {
    try{
        const result = await dailyNotesService.getAllNotes(req.query);
        res.status(200).json(result);
    } catch(err){
        next(err)
    }
}

export const getNoteById = async (req, res, next) => {
    try{
        const result = await dailyNotesService.getNoteById(req.params.id);
        res.status(200).json(result);
    }catch(err){
        next(err)
    }
}

export const deleteNote = async (req,res,next) => {
    try{
        const result = await dailyNotesService.deleteNote(req.params.id);
        res.status(200).json(result);
    }catch(err){
        next(err)
    }
    
}

export const createNote = async (req, res, next) => {
    try{
        const result = await dailyNotesService.createNote({...req.body, image : req.file ? req.file.filename : null});
        res.status(200).json(result);
    }catch(err){
        next(err)
    }

}

export const updateNote = async (req, res, next) => {
    try{
        const result = await dailyNotesService.updateNote(req);
        res.status(200).json(result);
    }catch(err){
        next(err)
    }
}

export const validationLogin = async (req, res, next) => {
    try{
        const result = await dailyNotesService.validationLogin(req.body);
        res.status(200).json(result)
    }catch(e){
        next(e)
    }
}