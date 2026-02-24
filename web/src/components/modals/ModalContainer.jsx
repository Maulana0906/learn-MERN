import {useState} from 'react';
import EditContent from './EditContent.jsx';
import CreateContent from './CreateContent.jsx';
import DetailContent from './DetailContent.jsx';
import Button from '../Button.jsx';

function ModalContainer({selectedTypeModal, onClickCloseModal, detailNote, editNote, sendNoteToServer}){

   const chooseContent = {
        "create" : <CreateContent sendNoteToServer={sendNoteToServer} />,
        "edit" : <EditContent data={detailNote} sendNoteToServer={sendNoteToServer}/>,
        "detail" : <DetailContent data={detailNote} editNote={editNote}/>    
   }

   return (
    <div className="fixed w-[50%] h-[50vh] bg-slate-50 shadow-sm rounded-xl top-1/2 left-1/2 -translate-1/2"> 
        <Button type="closeModalDetailNote" content="x" onClickModal={onClickCloseModal} />
        {chooseContent[selectedTypeModal]}    
    </div>
   )
}
export default ModalContainer;