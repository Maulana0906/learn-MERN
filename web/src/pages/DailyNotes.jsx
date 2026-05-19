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

const {notes, load, error, filter, fetchNotes, deleteNote, changePage, changeSearch, changeSort, resetValueSearch} = useContext(NotesContext);
const {isOpenModal, mode, selectedNote, openCreate, openDetail, openEdit, closeModal} = useModalNote();

    
    return (
        <>
            <div className="flex justify-between px-5">
                <h1 className="text-xl font-semibold m-2">List Notes :</h1> 
                <Search changeSearch={changeSearch} resetValueSearch={resetValueSearch} />  
                <Button content="Create Note" type="tersierBtn" typeButton="create" onClick={openCreate}/> 
            </div>
            <Sorting changeSort={changeSort} />
            <div className="flex gap-5 flex-wrap my-2 mx-4">
                {
                    notes.meta.total_notes < 1 ? <p className="text-center w-full text-lg font-medium mt-5 text-gray-500">Note not Found</p> :
                    notes.data.map((note,i) => {
                        return <CardNotes key={i} note={note} onClick={openDetail} useNotesDel={deleteNote} filter={filter} />
                    })
                }
            </div>
            {error &&
                <div className="absolute right-5 top-5 flex items-start sm:items-center p-4 mb-4 text-sm rounded-md bg-red-300 " role="alert">
                    <p><span className="font-medium me-1">Danger alert!</span> {error}</p>
                </div>
            }
            {load &&
                <div className="loader absolute top-1/2 left-1/2 -translate-x-1/2"></div>

            }
            {isOpenModal ? 
                 <ModalContainer mode={mode} closeModal={closeModal} selectedNote={selectedNote} onClickEdit={openEdit}/>
            : null
            }
        <Pagination page={filter.page} limit={filter.limit} totalPages={notes.meta.total_pages} totalNotes={notes.meta.total_notes} switchPage={changePage}/> 

        </> 
    )
}




export default DailyNotes;