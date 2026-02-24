import fs from "fs";

const getNotes = async () => {
    return await fs.promises.readFile("./server/src/data/notes.json", "utf-8");
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
        throw new Error("Note not found");
    } 

    const result = JSON.stringify(arrRes.filter(e => Number(e.id) !== Number(id)), null, 2);
    await fs.promises.writeFile("./server/src/data/notes.json",result, 'utf-8')
    
    return getNotes();
}

export const createNote = async (body) => {
    const res = await getNotes();
    const arrRes = await JSON.parse(res);

    const id = Math.max(...arrRes.map(e => e.id)) + 1;
    arrRes.push({
        id,
        title : body.title,
        content : body.content
    })
    await fs.promises.writeFile("./server/src/data/notes.json", JSON.stringify(arrRes, null, 2), 'utf-8');
    return getNotes();
}

export const updateNote = async (body) => {
    const res = await getNotes();
    const arrRes = await JSON.parse(res);
    
    const find = arrRes.filter(e => Number(e.id) === Number(body.id));

    if(!find){
         throw new Error("Note not found")
    }

    const result = arrRes.map(item => {
        if(Number(item.id) === Number(body.id)){
            return {...item, title : body.title, content : body.content}
        }
        return item;
    })

    await fs.promises.writeFile("./server/src/data/notes.json", JSON.stringify(result, null, 2), 'utf-8');
    return getNotes();
}