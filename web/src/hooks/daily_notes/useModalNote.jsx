import {useState} from 'react';

export const useModal = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [mode, setMode] = useState(null)
    const [selectedNote, setSelectedNote] = useState(null);

    const openCreate = () => {
        setMode("create");
        setIsOpenModal(true);
    }

}