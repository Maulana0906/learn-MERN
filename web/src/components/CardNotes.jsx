import Button from './Button.jsx';


function CardNotes({title, content, idNotes, onClickModal, deleteNote}){

    return (
        <div className="w-32 rounded-md bg-base-200 shadow-sm p-2">
            <h1 className="text-lg font-medium leading-5 text-gray-700">{title}</h1>
            <p className="text-sm mt-4">{content}</p>
            <Button type="tersierBtn" content="Detail note" idNotes={idNotes} onClickModal={onClickModal} typeButton="detail" />
            <Button type="redBtn" content="Delete note" idNotes={idNotes} onClickModal={deleteNote} typeButton="delete" />
        </div>
    )
}

export default CardNotes;