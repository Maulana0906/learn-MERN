
import { useState, useEffect } from "react";

function EditContent({data, sendNoteToServer}){
    const pivotData = data[0];

    const [formData, setFormData] = useState({
        title : "",
        content : ""
    })

    useEffect(() => {
        if(!pivotData) return;
        setFormData({
            id : pivotData.id,
            title : pivotData.title,
            content : pivotData.content
        })
    }, [pivotData])

    return (
        <div className="flex flex-col p-4 tracking-wide">
            <h1 className="font-semibold text-lg text-gray-700">Edit Note</h1>
            <form onSubmit={(e) => sendNoteToServer({type: "edit", formData}, e)}>
                <input type="hidden" value={pivotData.id} />
                <label htmlFor="title" className="flex gap-5 mt-10">
                    Title : 
                    <input type="text" className="w-3/4 border-2 border-gray-700 px-2 py-0.5 rounded-sm bg-gray-100" 
                        value={formData.title} onChange={(e) => 
                            setFormData({...formData, title : e.target.value})
                        } required />
                </label>
                <label htmlFor="title" className="flex gap-5 mt-5">
                    Content : 
                    <input type="text" className="w-3/4 border-2 border-gray-700 px-2 py-0.5 rounded-sm bg-gray-100 "
                        value={formData.content} onChange={(e) => 
                            setFormData({...formData, content : e.target.value})
                        } required/>
                </label>
                <button type="submit" className="rounded-md px-2 py-1 shadow-sm font-semibold tracking-wide text-sm my-2 leading-4 cursor-pointer bg-blue-500 text-white"> Save changes </button>
            </form>

        </div>
    )    
}
export default EditContent;