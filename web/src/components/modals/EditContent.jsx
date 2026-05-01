
import { useState, useEffect } from "react";

function EditContent({note, editNote, hookForm, closeModal}){
    const {formData, changeForm} = hookForm();
    
    useEffect(() => {
        for(let key in note){
            changeForm({target : {name : key, value : note[key]}})
        }   
    }, [])
    

    return (
        <div className="flex flex-col p-4 tracking-wide">
            <h1 className="font-semibold text-lg text-gray-700">Edit Note</h1>
            <form onSubmit={(e) => editNote({formData, closeModal}, e)}>  
                <input type="hidden" 
                name="id"
                value={formData.id} />
                <label htmlFor="title" className="flex gap-5 mt-10">
                    Title : 
                    <input type="text" className="w-3/4 border-2 border-gray-700 px-2 py-0.5 rounded-sm bg-gray-100" 
                        name="title"
                        value={formData.title} 
                        onChange={(e) => changeForm(e) } required />
                </label>
                <label htmlFor="title" className="flex gap-5 mt-5">
                    Content : 
                    <input type="text" className="w-3/4 border-2 border-gray-700 px-2 py-0.5 rounded-sm bg-gray-100 "
                        name="content"
                        value={formData.content} 
                        onChange={(e) => changeForm(e)} required/>
                </label>
                <img src={"http://localhost:3000/uploads/"+formData.image} className="w-20" alt="" />
                <input className="w-3/4 border-2 border-gray-700 px-2 py-0.5 rounded-sm bg-gray-100 mt-5 cursor-pointer" type="file" 
                name ="image"
                onChange={(e) => changeForm(e)} />
                <button type="submit" className="rounded-md px-2 py-1 shadow-sm font-semibold tracking-wide text-sm my-2 leading-4 cursor-pointer bg-blue-500 text-white"> Save changes </button>
            </form>

        </div>
    )    
}
export default EditContent;