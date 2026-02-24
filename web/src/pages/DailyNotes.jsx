import CardNotes from "../components/CardNotes";
import ModalContainer from "../components/modals/ModalContainer.jsx"
import {useState, useEffect} from "react";
import Button from "../components/Button.jsx";
import Pagination from "../components/pagination.jsx";

function DailyNotes(){
const defaultValue = {
    total_notes : 0,
    page : 1,
    data : []
}
const [notes, setNotes] = useState(defaultValue)

const page = notes.page || 1;
const limit = 5;

useEffect(() => {
    const fetchNotes = async() => {
        try{
            
            const res = await fetch(`http://localhost:3000/notes?page=${page}&limit=${limit}`)

            if(!res.ok){
                throw new Error("Failed to fetch notes")
            }

            const data = await res.json();
            const pivotData = JSON.parse(data)
            setNotes(pivotData);
        } catch(err){
            console.log(err)
        }
    }
    fetchNotes()
}, [])

const [isOpenModal, setIsOpenModal] = useState(false);
const [selectedTypeModal, setSelectedTypeModal] = useState(null)
const [selectedNote, setSelectedNote] = useState(null);
const [detailNote, setDetailNote] = useState(null);


useEffect(() => {
    if(selectedNote){
        const fetchNoteDetail = async () => {
            try{
                const res = await fetch(`http://localhost:3000/notes/${selectedNote}`)
                if(!res.ok){
                    throw new Error("Failed to fetch note detail")
                }

                const pivotData = await res.json();
                setDetailNote(JSON.parse(pivotData));
            }catch(err){
                console.log(err);
            }
        }
    fetchNoteDetail();
    }
}, [selectedNote])

function onClickModal({typeButton, idNotes}){
    if(isOpenModal) return;

    if(!idNotes){
        setSelectedNote(null)
        setSelectedTypeModal(() => isOpenModal ? null : typeButton);
        setIsOpenModal(prev => !prev)
        return
    }
    setSelectedNote(()=> isOpenModal ? null : idNotes)
    setSelectedTypeModal(() => isOpenModal ? null : typeButton);
    setIsOpenModal(prev => !prev)
}

function onClickCloseModal(){
    setSelectedNote(null)
    setSelectedTypeModal(null);
    setIsOpenModal(false)
}

function editNote(){
    setSelectedTypeModal("edit");
}

function sendNoteToServer({type, formData}, e){
    e.preventDefault();

    if(type === "edit"){
        const putNote = async () => {
                try{
                    const res = await fetch(`http://localhost:3000/notes/${formData.id}?page=${page}&limit=${limit}`, {
                        method : "PUT",
                        headers : {
                            "Content-Type" : "application/json",
                        },
                        body : JSON.stringify(formData)
                    })

                    if(!res.ok){
                        throw new Error("Failed to fetch note detail")
                    }

                    const data = await res.json();
                    const pivotData = JSON.parse(data);

                    setNotes(pivotData);
                    setDetailNote(pivotData.data.filter(e => e.id === formData.id))


                }catch(err){
                    console.log(err);
                }
            }
        putNote();
        setSelectedTypeModal("detail");
    }else if(type === "create"){
         const postNote = async () => {
                try{
                    const res = await fetch(`http://localhost:3000/notes?page=${page}&limit=${limit}`, {
                        method : "POST",
                        headers : {
                            "Content-Type" : "application/json",
                        },
                        body : JSON.stringify(formData)
                    })

                    if(!res.ok){
                        throw new Error("Failed to fetch note detail")
                    }

                    const pivotData = await res.json();
                    setNotes(JSON.parse(pivotData));
                }catch(err){
                    console.log(err);
                }
            }
        postNote();
        onClickCloseModal();
    }
}

function deleteNote({typeButton, idNotes}){
    const confirm = window.confirm("Are you sure you want to delete this note ?")

    if(!confirm) return;

    const dlt = async () => {
        try{
            const res = await fetch(`http://localhost:3000/notes/${idNotes}/?page=${page}&limit=${limit}`, {
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            if(!res.ok){
                throw new Error("Failed to delete note")
            }
            const pivotData = await res.json();
            setNotes(JSON.parse(pivotData));
        }catch(err){
            console.log(err)
        }
    }
    dlt();
}

function switchPage({page, limit}){
     const fetchNotes = async() => {
        try{
            const res = await fetch(`http://localhost:3000/notes?page=${page}&limit=${limit}`)

            if(!res.ok){
                throw new Error("Failed to fetch notes")
            }

            const data = await res.json();
            const pivotData = JSON.parse(data)
            console.log(pivotData)
            setNotes(pivotData);
        } catch(err){
            console.log(err)
        }
    }
    fetchNotes()
}

    return (
        <>
            <div className="flex justify-between px-5">
                <h1 className="text-xl font-semibold m-2">List Notes :</h1>
                <Button content="Create Note" type="tersierBtn" typeButton="create" onClickModal={onClickModal}/>
            </div>
            <div className="flex gap-5 flex-wrap my-2 mx-4">
                { 
                    notes.data.map((note,i) => {
                        return <CardNotes key={i} onClickModal={onClickModal} idNotes={note.id} title={note.title} content={note.content} deleteNote={deleteNote} />
                    })
                }
            </div>
            <Pagination page={page} limit={limit} notes={notes.total_notes} swicthPage={switchPage} />
            {
                isOpenModal ? 
                <ModalContainer selectedTypeModal={selectedTypeModal} editNote={editNote} onClickCloseModal={onClickCloseModal} detailNote={detailNote} sendNoteToServer={sendNoteToServer} />
                : null
            }

        </> 
    )
}

export default DailyNotes;