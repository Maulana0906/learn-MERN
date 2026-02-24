
function Button({type, content, onClickModal, idNotes, typeButton}){
    let design = "";
    switch(type){
        case "tersierBtn" :
            design = "rounded-md px-2 py-1 shadow-sm font-semibold tracking-wide text-sm my-2 leading-4 cursor-pointer bg-orange-500 text-white"
            break;
        case "blueBtn" :
            design = "rounded-md px-2 py-1 shadow-sm font-semibold tracking-wide text-sm my-2 leading-4 cursor-pointer bg-blue-500 text-white"
            break;
        case "redBtn" :
            design = "rounded-md px-2 py-1 shadow-sm font-semibold tracking-wide text-sm my-2 leading-4 cursor-pointer border-2 border-red-500 text-red-500"
            break;
        case "closeModalDetailNote" :
            design = "cursor-pointer w-8 pb-1 text-xl font-bold text-gray-800 bg-slate-200 rounded-full absolute right-3 top-3"
            break;
    }
     
    
    return (
        <button className={design} onClick={() => onClickModal({typeButton, idNotes})}>{content}</button>
    )
}

export default Button;