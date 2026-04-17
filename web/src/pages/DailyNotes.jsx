import CardNotes from "../components/CardNotes";
import ModalContainer from "../components/modals/ModalContainer.jsx"
import {useState, useEffect} from "react";
import Button from "../components/Button.jsx";
import Pagination from "../components/Pagination.jsx";
import Search from "../components/Search.jsx";
import Sorting from "../components/Sorting.jsx";

function DailyNotes(){

const defaultValue = {
    data : [],
    meta : {
        page : 1,
        limit : 5,
        total_notes : 0,
        total_pages : 0
    }
}

const [notes, setNotes] = useState(defaultValue)

const page = notes.meta.page || 1;
const limit = 5;

const [isSorting, setIsSorting] = useState({
    value : false,
    type : ""
})

useEffect(() => {
    const fetchNotes = async() => {
        try{
            
            const res = await fetch(`http://localhost:3000/notes?page=${page}&limit=${limit}`, {
                method : "GET",
                headers : {
                            "Content-Type" : "application/json"
                        }
            })

            if(!res.ok){
                throw new Error("Failed to fetch notes")
            }

            const data = await res.json();
            const pivotData = JSON.parse(data)

            setNotes({data : pivotData.data, meta : pivotData.meta});
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
const [isSearch, setIsSearch] = useState({
    value : false,
    title : ""
});


useEffect(() => {
    if(selectedNote){
        const fetchNoteDetail = async () => {
            try{
                const res = await fetch(`http://localhost:3000/notes/${selectedNote}`, {
                    method : "GET",
                    headers : {
                            "Content-Type" : "application/json"
                        }
                })
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

    function validationTypeImg(fileName){
        console.log(fileName)
        const arr = fileName.split('').reverse();
        console.log("lolos")
        const arrExt = [];
        const dataExt = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif']

        for(let i=0; i<arr.length; i++) {
            if(arr[i] !== '.'){
                arrExt.push(arr[i])
            }else{
                break;
            }
        };
        const ext = arrExt.reverse().join('');

        const findExt = dataExt.find(e => e === ext.toLocaleLowerCase());

        if(!findExt){
            throw new Error("File must be an image")
        }

       
    }

    if(type === "edit"){
        const putNote = async () => {
                try{
                    const form = new FormData();
                    form.append("id", formData.id)
                    form.append("title", formData.title)
                    form.append("content", formData.content)
                    form.append("image", formData.image)

                    if(formData.image.name){
                        validationTypeImg(formData.image.name)
                    }

                    const res = await fetch(`http://localhost:3000/notes/${formData.id}?page=${page}&limit=${limit}`, {
                        method : "PUT",
                        body : form
                    })
                    const resJson = await res.json();

                    if(!res.ok){
                        throw new Error(resJson.message)
                    }

                    const data = await res.json();
                    const pivotData = JSON.parse(data);

                    setNotes(pivotData);
                    setDetailNote(pivotData.data.filter(e => e.id === formData.id))

                    setSelectedTypeModal("detail");
                }catch(err){
                    alert(err.message);
                }
            }
        putNote();
    }else if(type === "create"){
        const postNote = async () => {
                try{
                    const form = new FormData();
                    form.append("title", formData.title)
                    form.append("content", formData.content)
                    form.append("image", formData.image)

                    validationTypeImg(formData.image.name)
                    const res = await fetch(`http://localhost:3000/notes?page=${page}&limit=${limit}`, {
                        method : "POST",
                        body : form
                    })

                    if(!res.ok){
                        throw new Error("Failed to fetch note detail")
                    }

                    const pivotData = await res.json();
                    setNotes(JSON.parse(pivotData));

                    onClickCloseModal();
                }catch(err){
                    alert(err.message);
                }
            }
        postNote();
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
            let url = null;
            
            if(isSearch.value || isSorting.value){
                if(isSearch.value && isSorting.value){
                    url = `http://localhost:3000/notes/?page=${page}&limit=${limit}&search=${isSearch.title}&sort=${isSorting.type}`
                } else if(isSearch.value){
                    url = `http://localhost:3000/notes/?page=${page}&limit=${limit}&search=${isSearch.title}`
                } else if(isSorting.value){
                    url = `http://localhost:3000/notes/?page=${page}&limit=${limit}&sort=${isSorting.type}`
                }
            } else{
                url = `http://localhost:3000/notes?page=${page}&limit=${limit}`
            }

            
            const res = await fetch(url, {
                method : "GET"
            })

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
}

function resetValueSearch({page, limit}){
     const fetchNotes = async() => {
        try{
            setIsSearch(prev => ({...prev, value : false, title : ""}));
            const res = await fetch(`http://localhost:3000/notes?page=${page}&limit=${limit}`, {
                method : "GET"
            })

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
}
function searchNotes({content}, e){
    e.preventDefault();
    const fetchNotes = async() => {
        try {
            const res = await fetch(`http://localhost:3000/notes?page=1&limit=5&search=${content}`, {
                method : "GET",
                headers : {
                            "Content-Type" : "application/json"
                        }
            })
              if(!res.ok){
                throw new Error("Failed to fetch notes")
            }
            setIsSearch({value : true, title : content})
            const data = await res.json();
            const pivotData = JSON.parse(data)

            setNotes(pivotData);
        }catch(err){
            console.log(err)
        }
    }
    fetchNotes()
}

function handleSorting({typeButton}){
    const fetchNotes = async () => {
        try {
            const res = await fetch(`http://localhost:3000/notes?page=1&limit=5&sort=${typeButton}`, {
                method : "GET",
                headers : {
                            "Content-Type" : "application/json"
                        }
            })

            if(!res.ok){
                throw new Error("Failed to fetch notes");
            }

            setIsSorting({value : true, type : typeButton})
            const data = await res.json();
            const pivotData = JSON.parse(data)

            setNotes(pivotData);

        }catch(err){
            console.log(err)
        }
    }
    fetchNotes()
}

    return (
        <>
            <div className="flex justify-between px-5">
                <h1 className="text-xl font-semibold m-2">List Notes :</h1>
                <Search searchNotes={searchNotes} resetValueSearch={resetValueSearch} />
                <Button content="Create Note" type="tersierBtn" typeButton="create" onClickModal={onClickModal}/>
            </div>
            <Sorting handleSorting={handleSorting} />
            <div className="flex gap-5 flex-wrap my-2 mx-4">
                {
                    notes.meta.total_notes < 1 ? <p className="text-center w-full text-lg font-medium mt-5 text-gray-500">Note not Found</p> :
                    notes.data.map((note,i) => {
                        return <CardNotes key={i} onClickModal={onClickModal} pathImage={note.image} idNotes={note.id} title={note.title} content={note.content} deleteNote={deleteNote} isSearch={isSearch} />
                    })
                }
            </div>
            <Pagination page={page} limit={limit} totalNotes={notes.meta.total_notes} switchPage={switchPage}/>
            {
                isOpenModal ? 
                <ModalContainer selectedTypeModal={selectedTypeModal} editNote={editNote} onClickCloseModal={onClickCloseModal} detailNote={detailNote} sendNoteToServer={sendNoteToServer} />
                : null
            }

        </> 
    )
}

export default DailyNotes;