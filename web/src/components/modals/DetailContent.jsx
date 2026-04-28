import Button from '../Button.jsx';

function DetailContent({note, onClick}){

    if(!note) return (
        <h1 className="text-center mt-10">loading</h1>
    )


    return (
        <>
            <h1 className="mt-10 text-center font-semibold text-2xl">{note.title}</h1> 
            <p className="m-2 text-sm text-justify">{note.content}</p>
            <img src={"http://localhost:3000/uploads/"+note.image} alt="" className="w-20" />
            <div className="flex justify-center mt-4">
                <Button  type="tersierBtn" content="Edit" onClick={() => onClick(note)}/>
            </div>
        </>
    )
}
export default DetailContent;