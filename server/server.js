const express = require("express");
const app = express(); 

app.use(express.json()); 
const cors = require("cors"); 
app.use(cors()) 

const notes = [
     { id: 1, title: "Belajar Express", content: "Hari ini belajar basic Express", }, 
     { id: 2, title: "Belajar React", content: "Hari ini belajar basic React", } ]

function singleNotes(id, notes) { 
    return notes.filter(e => e.id == id) 
} 

app.get("/notes", (req, res) => { 
    res.json(notes);
}); 
 
app.get("/notes/:id", (req, res) => { 
    const pivotData = singleNotes(req.params.id, notes)

    if(pivotData.length > 0){
        return res.json(pivotData) 
    }else {
        return res.json({"message" : "Daily note not found"}) 
    } 
}); 

app.post("/notes", (req,res) => { 
    const id = Math.max(...notes.map(e => e.id)) + 1; 

    const pivotData = {
         id : id, 
         title : req.body.title,
        content : req.body.content 
    }
notes.push(pivotData); 
return res.json(notes) 
}) 

app.put("/notes/:id", (req,res) => { 
    let bool = false;
    for(let i=0; i<notes.length; i++){ 
        if(notes[i].id == req.params.id){
            bool = true;
            notes[i] = { 
                id : notes[i].id, 
                title : req.body.title,
                content : req.body.content 
            } 
            break;
        } 
    } 
    return bool ? res.json(notes) : res.status(404).json({
      message: "Note not found"
    });
}) 

app.delete("/notes/:id", (req,res) => { 
    const index = notes.findIndex(e => e.id == req.params.id);
    
    if(index === -1){
        return res.status(404).json({
            message: "Note not found"
        });
    }
    notes.splice(index, 1);
    return res.json(notes);
}) 

app.listen(3000, () => {
     console.log("Server running on port 3000"); 
});