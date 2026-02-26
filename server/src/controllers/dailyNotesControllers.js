import * as dailyNotesService from  "../services/dailyNotesService.js";

const result = (data, page, limit) => {
    const startIndex = (page - 1) *limit;
    const endIndex = page * limit;

    const dataSlice = data.slice(startIndex, endIndex);
    return {
        total_notes : data.length,
        data : dataSlice,
        page : page
    }
}

export const getAllNotes = async (req, res) => {
    try{
        const {page, limit} = req.query;
        const fileBuffer = await dailyNotesService.getAllNotes();

        const data = JSON.parse(fileBuffer)
        const pivotData = result(data, page, limit)
        
        return res.status(200).json(JSON.stringify(pivotData))
    }catch(err){
        res.status(400).json({"message" : err.message})
    }
}

export const getNoteById = async (req, res) => {
    try{
        const pivotData = await dailyNotesService.getNoteById(req.params.id);
        return res.status(200).json(pivotData)
    }catch(err){
        res.status(400).json({"message" : err.message})
    }
}

export const deleteNote = async (req, res) => {
    try{
        const {page, limit} = req.query;
        const fileBuffer = await dailyNotesService.deleteNote(req.params.id);
        const data = JSON.parse(fileBuffer)
        const pivotData = result(data, page, limit)
        
        return res.status(200).json(JSON.stringify(pivotData))
    }catch(err){
        res.status(400).json({"message" : err.message})
    }
}

export const createNote = async (req, res) => {
    try{
        const {page, limit} = req.query;
        const fileBuffer = await dailyNotesService.createNote(req.body);
        const data = JSON.parse(fileBuffer)
        const pivotData = result(data, page, limit)
        
        return res.status(200).json(JSON.stringify(pivotData))
    }catch(err){
        res.status(400).json({"message" : err.message})
    }
}

export const updateNote = async (req, res) => {
    try{
        const {page, limit} = req.query;
        const fileBuffer = await dailyNotesService.updateNote(req.body);
        const data = JSON.parse(fileBuffer)
        const pivotData = result(data, page, limit)
        
        return res.status(200).json(JSON.stringify(pivotData))
    }catch(err){
        res.status(400).json({"message" : err.message})
    }
}

export const searchNotesByTitle = async (req, res) => {
     try{
        const fileBuffer = await dailyNotesService.searchNotesByTitle(req.params.title);
        const data = JSON.parse(fileBuffer);
        const pivotData = {
            total_notes : data.length,
            data : data,
            page : 1
        }
        return res.status(200).json(JSON.stringify(pivotData))

    }catch(err){
        res.status(400).json({"message" : err.message})
    }
}