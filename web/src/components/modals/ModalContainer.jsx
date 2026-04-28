import {useState, useContext} from 'react';
import EditContent from './EditContent.jsx';
import CreateContent from './CreateContent.jsx';
import DetailContent from './DetailContent.jsx';
import Button from '../Button.jsx';

import {NotesContext} from "../../context/NotesContext.jsx";
import {useFormNote} from "../../hooks/daily_notes/useFormNote.jsx";

function ModalContainer({mode, closeModal, selectedNote, onClickEdit, sendNoteToServer}){
    const {createNote, editNote} = useContext(NotesContext);

    const chooseContent = {
        "create" : <CreateContent createNote={createNote} hookForm={useFormNote}/>,
        "edit" : <EditContent note={selectedNote} editNote={editNote} hookForm={useFormNote}/>,
        "detail" : <DetailContent note={selectedNote} onClick={onClickEdit} />    
    }

   return (
    <div className="fixed w-[50%] h-[50vh] bg-slate-50 shadow-sm rounded-xl top-1/2 left-1/2 -translate-1/2"> 
        <Button type="closeModalDetailNote" content="x" onClick={closeModal} />
        {chooseContent[mode]}    
    </div>
   )
}
export default ModalContainer;