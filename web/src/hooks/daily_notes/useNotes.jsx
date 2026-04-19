import {useState} from "react";

export const useNotes = () => {
    const defaultValueNotes = {
        data : [],
        meta : {
            page : 1,
            limit : 5,
            total_notes : 0,
            total_pages : 0
        }
    }
    const [notes, setNotes] = useState(defaultValueNotes);
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(null)

    const fetchNotes = async(params="") => {
        setLoad(true)
        try{
            
            const res = await fetch(`http://localhost:3000/notes?${params}`, {
                method : "GET",
                headers : {
                            "Content-Type" : "application/json"
                        }
            })
            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message)
            }

            setNotes(data);
        } catch(err){
            setError(err.message)
        } finally{
            setLoad(false)
        }
    }

    const createNote = (formData) => {
        setLoad(true)
        
        function validationTypeImg(file){
            const allowedTypes= ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"]
            
            if(!allowedTypes.includes(file.type)){
                throw new Error("File must be an image")
            }
        }

         try{
            const form = new FormData();
            form.append("title", formData.title)
            form.append("content", formData.content)
            form.append("image", formData.image)

            validationTypeImg(formData.image.name)
            const res = await fetch(`http://localhost:3000/notes?page=${page}&limit=${limit}`, {
                method : "POST",
                body : form
            })
            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message)
            }
            setNotes(data);

            // onClickCloseModal();
            return {success : true}
        }catch(err){
            setError(err.message);
            return { success: false, message: err.message };
        }finally{
            setLoad(false)
        }       
    }
}

