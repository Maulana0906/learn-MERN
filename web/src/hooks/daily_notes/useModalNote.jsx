import {useState} from 'react';

export const useModalNote = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [mode, setMode] = useState(null)
    const [selectedNote, setSelectedNote] = useState(null);

    const closeModal = () => {
        setIsOpenModal(false);
        setMode(null);
        setSelectedNote(null);
    }

    const openDetail = (note) => {
        setMode("detail");
        setIsOpenModal(true);
        setSelectedNote(note);
    }

    const openCreate = () => {
        setMode("create");
        setIsOpenModal(true);
    }

    const openEdit = (note) => {
        setMode("edit");
        setIsOpenModal(true);
        setSelectedNote(note);
    }

    return {
        isOpenModal,
        mode,
        selectedNote,
        closeModal,
        openCreate,
        openDetail,
        openEdit
    }


}