import Button from './Button.jsx';


function CardNotes({note, onClick}){
    const {id, title, content, image} = note
    // const markSearch = (title, keyword) => {
    //     if(!keyword || keyword.length < 1) return title;

    //     const regexSymbol = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    //     const regexFinal = new RegExp(`(${regexSymbol})`, "gi");
    //     const parts = title.split(regexFinal);

    //     const result = parts.map((part, i) => 
    //         part.toLowerCase() === keyword.toLowerCase() ? (<mark className='h-2 leading-1.5 bg-amber-200' key={i}>{part}</mark>)
    //             : (part)
    //     )
    //     return result;
        
    // }
    return (
        <div className="w-32 rounded-md bg-base-200 shadow-sm p-2">
            <img src={"http://localhost:3000"+"/uploads/"+image} className="w-10 h-10 rounded-md" alt="" />
            <h1 className="text-lg font-medium leading-5 text-gray-700">{title}</h1>
            <p className="text-sm mt-4">{content}</p>
            <Button type="tersierBtn" content="Detail note" typeButton="detail" onClick={onClick} note={note} />
        </div> 
    
)
}
// {/* <h1 className="text-lg font-medium leading-5 text-gray-700">{markSearch(title, isSearch.title)}</h1> */}
// <Button type="redBtn" content="Delete note" idNotes={idNotes} onClickModal={deleteNote} typeButton="delete" /> */}

export default CardNotes;