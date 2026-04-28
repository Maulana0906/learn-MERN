import {useEffect, useState} from "react";

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

    useEffect(() => {
        if(!error) return
        
        const timer = setTimeout(() => {
            setError(null)
        }, 2000)

        return () => clearTimeout(timer)
    },[error])

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

    const createNote = async ({formData, resetForm}, e) => {
        e.preventDefault();
        
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

            validationTypeImg(formData.image)
            
            const createNote = await fetch("http://localhost:3000/notes", {
                method : "POST",
                body : form
            })
            const respon = await createNote.json();
            
            if(!createNote.ok){
                throw new Error(respon.message)
            }
            await fetchNotes("page=1&limit=5");

            resetForm();
            return {success : true}
        }catch(err){
            setError(err.message);
        }finally{
            setLoad(false)
        }       
    }

    const editNote = async (formData, e) => {
        e.preventDefault();
        console.log(formData)
        setLoad(true)
             
        function validationTypeImg(file){
            const allowedTypes= ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"]
                
            if(!allowedTypes.includes(file.type)){
                throw new Error("File must be an image")
            }
        }

        try{
            const form = new FormData();
            form.append("id", formData.id)
            form.append("title", formData.title)
            form.append("content", formData.content)
            form.append("image", formData.image)

            if(formData.image instanceof File){
                validationTypeImg(formData.image)
            }

            const updateNote = await fetch(`http://localhost:3000/notes`, {
                method : "PUT",
                body : form
            })
            const respon = await updateNote.json();
            
            if(!updateNote.ok){
                throw new Error(respon.message)
            }
            // PERLU PERBAIKAN, KARENA YANG DI EDIT KAN BUKAN SELALU HALAMAN KE-1
            await fetchNotes("page=1&limit=5");

        }catch(err){
            setError(err.message);
        }finally{
            setLoad(false)
        }
    }

    return {
        notes,
        load,
        error, 
        fetchNotes,
        createNote,
        editNote
    }
}

