import Button from '../Button.jsx';

function DetailContent({data, editNote}){

    if(!data) return (
        <h1 className="text-center mt-10">loading</h1>
    )


    return (
        <>
            <h1 className="mt-10 text-center font-semibold text-2xl">{data[0].title}</h1> 
            <p className="m-2 text-sm text-justify">{data[0].content}</p>
            <img src={"http://localhost:3000/uploads/"+data[0].image} alt="" className="w-20" />
            <div className="flex justify-center mt-4">
                <Button  type="tersierBtn" content="Edit" onClickModal={editNote} typeButton="edit" idNotes={data[0].id} />
            </div>
        </>
    )
}
export default DetailContent;