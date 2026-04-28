import "../App.css";
import CardNotes from "../components/CardNotes";
import ModalContainer from "../components/modals/ModalContainer.jsx"
import {useState, useEffect, useContext} from "react";
import Button from "../components/Button.jsx";
import Pagination from "../components/Pagination.jsx";
import Search from "../components/Search.jsx";
import Sorting from "../components/Sorting.jsx";

import { useModalNote } from "../hooks/daily_notes/useModalNote";
import { useFormNote } from "../hooks/daily_notes/useFormNote.jsx";
import {NotesContext} from "../context/NotesContext.jsx";

function DailyNotes(){


// const [detailNote, setDetailNote] = useState(null);
// const [isSearch, setIsSearch] = useState({
//     value : false,
//     title : ""
// });
// const page = notes.meta.page || 1;
// const limit = 5;
// const [isSorting, setIsSorting] = useState({
//     value : false,
//     type : ""
// })

// // get all note
// useEffect(() => {
//     const fetchNotes = async() => {
//         try{
            
//             const res = await fetch(`http://localhost:3000/notes?page=${page}&limit=${limit}`, {
//                 method : "GET",
//                 headers : {
//                             "Content-Type" : "application/json"
//                         }
//             })

//             if(!res.ok){
//                 throw new Error("Failed to fetch notes")
//             }

//             const data = await res.json();
//             const pivotData = JSON.parse(data)

//             setNotes({data : pivotData.data, meta : pivotData.meta});
//         } catch(err){
//             console.log(err)
//         }
//     }
//     fetchNotes()
// }, [])
// // Detail note
// useEffect(() => {
//     if(selectedNote){
//         const fetchNoteDetail = async () => {
//             try{
//                 const res = await fetch(`http://localhost:3000/notes/${selectedNote}`, {
//                     method : "GET",
//                     headers : {
//                             "Content-Type" : "application/json"
//                         }
//                 })
//                 if(!res.ok){
//                     throw new Error("Failed to fetch note detail")
//                 }

//                 const pivotData = await res.json();
//                 setDetailNote(JSON.parse(pivotData));
//             }catch(err){
//                 console.log(err);
//             }
//         }
//     fetchNoteDetail();
//     }
// }, [selectedNote])


// // UI modal
// function onClickModal({typeButton, idNotes}){
//     if(isOpenModal) return;

//     if(!idNotes){
//         setSelectedNote(null)
//         setSelectedTypeModal(() => isOpenModal ? null : typeButton);
//         setIsOpenModal(prev => !prev)
//         return
//     }

    

//     setSelectedNote(()=> isOpenModal ? null : idNotes)
//     setSelectedTypeModal(() => isOpenModal ? null : typeButton);
//     setIsOpenModal(prev => !prev)
// }
// function onClickCloseModal(){
//     setSelectedNote(null)
//     setSelectedTypeModal(null);
//     setIsOpenModal(false)
// }
// function editNote(){
//     setSelectedTypeModal("edit");
// }

// // CRUD
// function sendNoteToServer({type, formData}, e){
//     e.preventDefault();

//     function validationTypeImg(fileName){
//         console.log(fileName)
//         const arr = fileName.split('').reverse();
//         console.log("lolos")
//         const arrExt = [];
//         const dataExt = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif']

//         for(let i=0; i<arr.length; i++) {
//             if(arr[i] !== '.'){
//                 arrExt.push(arr[i])
//             }else{
//                 break;
//             }
//         };
//         const ext = arrExt.reverse().join('');

//         const findExt = dataExt.find(e => e === ext.toLocaleLowerCase());

//         if(!findExt){
//             throw new Error("File must be an image")
//         }

       
//     }

//     if(type === "edit"){
//         const putNote = async () => {
//                 try{
//                     const form = new FormData();
//                     form.append("id", formData.id)
//                     form.append("title", formData.title)
//                     form.append("content", formData.content)
//                     form.append("image", formData.image)

//                     if(formData.image.name){
//                         validationTypeImg(formData.image.name)
//                     }

//                     const res = await fetch(`http://localhost:3000/notes/${formData.id}?page=${page}&limit=${limit}`, {
//                         method : "PUT",
//                         body : form
//                     })
//                     const data = await res.json();

//                     if(!res.ok){
//                         throw new Error(data.message)
//                     }

//                     const pivotData = JSON.parse(data);

//                     setNotes(pivotData);
//                     setDetailNote(pivotData.data.filter(e => e.id === formData.id))

//                     setSelectedTypeModal("detail");
//                 }catch(err){
//                     alert(err.message);
//                 }
//             }
//         putNote();
//     }else if(type === "create"){
//         const postNote = async () => {
//                 try{
//                     const form = new FormData();
//                     form.append("title", formData.title)
//                     form.append("content", formData.content)
//                     form.append("image", formData.image)

//                     validationTypeImg(formData.image.name)
//                     const res = await fetch(`http://localhost:3000/notes?page=${page}&limit=${limit}`, {
//                         method : "POST",
//                         body : form
//                     })

//                     if(!res.ok){
//                         throw new Error("Failed to fetch note detail")
//                     }

//                     const pivotData = await res.json();
//                     setNotes(JSON.parse(pivotData));

//                     onClickCloseModal();
//                 }catch(err){
//                     alert(err.message);
//                 }
//             }
//         postNote();
//     }
// }
// function deleteNote({typeButton, idNotes}){
//     const confirm = window.confirm("Are you sure you want to delete this note ?")

//     if(!confirm) return;

//     const dlt = async () => {
//         try{
//             const res = await fetch(`http://localhost:3000/notes/${idNotes}/?page=${page}&limit=${limit}`, {
//                 method : "DELETE",
//                 headers : {
//                     "Content-Type" : "application/json"
//                 }
//             })
//             if(!res.ok){
//                 throw new Error("Failed to delete note")
//             }
//             const pivotData = await res.json();
//             setNotes(JSON.parse(pivotData));
//         }catch(err){
//             console.log(err)
//         }
//     }
//     dlt();
// }

// // pagination
// function switchPage({page, limit}){
//      const fetchNotes = async() => {
//         try{
//             let url = null;
            
//             if(isSearch.value || isSorting.value){
//                 if(isSearch.value && isSorting.value){
//                     url = `http://localhost:3000/notes/?page=${page}&limit=${limit}&search=${isSearch.title}&sort=${isSorting.type}`
//                 } else if(isSearch.value){
//                     url = `http://localhost:3000/notes/?page=${page}&limit=${limit}&search=${isSearch.title}`
//                 } else if(isSorting.value){
//                     url = `http://localhost:3000/notes/?page=${page}&limit=${limit}&sort=${isSorting.type}`
//                 }
//             } else{
//                 url = `http://localhost:3000/notes?page=${page}&limit=${limit}`
//             }

            
//             const res = await fetch(url, {
//                 method : "GET"
//             })

//             if(!res.ok){
//                 throw new Error("Failed to fetch notes")
//             }

//             const data = await res.json();
//             const pivotData = JSON.parse(data)

//             setNotes(pivotData);
//         } catch(err){
//             console.log(err)
//         }
//     }
//     fetchNotes()
// }

// // search
// function resetValueSearch({page, limit}){
//      const fetchNotes = async() => {
//         try{
//             setIsSearch(prev => ({...prev, value : false, title : ""}));
//             const res = await fetch(`http://localhost:3000/notes?page=${page}&limit=${limit}`, {
//                 method : "GET"
//             })

//             if(!res.ok){
//                 throw new Error("Failed to fetch notes")
//             }

//             const data = await res.json();
//             const pivotData = JSON.parse(data)

//             setNotes(pivotData);
//         } catch(err){
//             console.log(err)
//         }
//     }
//     fetchNotes()
// }
// function searchNotes({content}, e){
//     e.preventDefault();
//     const fetchNotes = async() => {
//         try {
//             const res = await fetch(`http://localhost:3000/notes?page=1&limit=5&search=${content}`, {
//                 method : "GET",
//                 headers : {
//                             "Content-Type" : "application/json"
//                         }
//             })
//               if(!res.ok){
//                 throw new Error("Failed to fetch notes")
//             }
//             setIsSearch({value : true, title : content})
//             const data = await res.json();
//             const pivotData = JSON.parse(data)

//             setNotes(pivotData);
//         }catch(err){
//             console.log(err)
//         }
//     }
//     fetchNotes()
// }

// Repairing function
const {notes, load, error, fetchNotes} = useContext(NotesContext);
const {isOpenModal, mode, selectedNote, openCreate, openDetail, openEdit, closeModal} = useModalNote();


useEffect(() => {
    fetchNotes("page=1&limit=5")
}, []);



// // sorting
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
                <Button content="Create Note" type="tersierBtn" typeButton="create" onClick={openCreate}/> 
            </div>
            <Sorting handleSorting={handleSorting} />
            <div className="flex gap-5 flex-wrap my-2 mx-4">
                {
                    notes.meta.total_notes < 1 ? <p className="text-center w-full text-lg font-medium mt-5 text-gray-500">Note not Found</p> :
                    notes.data.map((note,i) => {
                        return <CardNotes key={i} note={note} onClick={openDetail}/>
                    })
                }
            </div>
            {error &&
                <div class="absolute right-5 top-5 flex items-start sm:items-center p-4 mb-4 text-sm rounded-md bg-red-300 " role="alert">
                    <svg class="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                    <p><span class="font-medium me-1">Danger alert!</span> {error}</p>
                </div>
            }
            {load &&
                <div className="loader absolute top-1/2 left-1/2 -translate-x-1/2"></div>

            }
            {isOpenModal ? 
                 <ModalContainer mode={mode} closeModal={closeModal} selectedNote={selectedNote}  onClickEdit={openEdit}/>
            : null
            }

        </> 
    )
}

// {/* <Pagination page={page} limit={limit} totalNotes={notes.meta.total_notes} switchPage={switchPage}/> */}
// {

// {/* <Search searchNotes={searchNotes} resetValueSearch={resetValueSearch} />  */}

export default DailyNotes;