import * as dailyNotesService from  "../services/dailyNotesService.js";

const result = (data, page, limit) => {
    const startIndex = (page - 1) *limit;
    const endIndex = page * limit;

    const checkPage = data.length < 1 ? 0 : page;
    const dataSlice = data.slice(startIndex, endIndex);
    return {
        total_notes : data.length,
        data : dataSlice,
        page : checkPage
    }
}

export const getAllNotes = async (req, res) => {
    try{
        const {page, limit, search, sort} = req.query;
        const fileBuffer = await dailyNotesService.getAllNotes();

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
        const fileBuffer = await dailyNotesService.createNote({...req.body, image : req.file ? req.file.filename : null});
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
        const fileBuffer = await dailyNotesService.updateNote({...req.body, image : req.file ? req.file.filename : null});
        const data = JSON.parse(fileBuffer)
        const pivotData = result(data, page, limit)
        
        return res.status(200).json(JSON.stringify(pivotData))
    }catch(err){
        res.status(400).json({"message" : err.message})
    }
}
