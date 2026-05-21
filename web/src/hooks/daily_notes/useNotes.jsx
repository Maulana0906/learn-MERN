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
    const [filter, setFilter] = useState({
        page : 1,
        limit : 5,
        search : "",
        sort : ""
    })

    useEffect(() => {
        if(!error) return
        
        const timer = setTimeout(() => {
            setError(null)
        }, 2000)

        return () => clearTimeout(timer)
    },[error])

    useEffect(() => {
        const params = new URLSearchParams(filter).toString();
        fetchNotes(params);
    }, [filter])

    const getNewAccessToken = async () => {
        setLoad(true)
        try{
            const res = await fetch(`http://localhost:3000/user/access_token`, {
                        method : "GET",
                        credentials: "include"
            })
            const data = await res.json();
            console.log(data)

            localStorage.setItem("accessToken" , data.accessToken)
        }catch(err){
            setError(err)
        }finally{
            setLoad(false)
        }
    }   

    const fetchNotes = async(params="") => {
        setLoad(true)
        try{
            
            const res = await fetch(`http://localhost:3000/notes?${params}`, {
                method : "GET",
                credentials: "include",
                headers : {
                            "Content-Type" : "application/json",
                            authorization : `Bearer ${localStorage.getItem("accessToken")}`
                        }
            })
            const data = await res.json();

            if(res.status === 401 && data.expired){
                await getNewAccessToken()
                
                return fetchNotes(params)
                return;
            }

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

    const createNote = async ({formData, resetForm, closeModal}, e) => {
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
            await fetchNotes(`page=${filter.page}&limit=${filter.limit}`);

            resetForm();
            closeModal();
            return {success : true}
        }catch(err){
            setError(err.message);
        }finally{
            setLoad(false)
        }       
    }

    const editNote = async ({formData, closeModal}, e) => {
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
            form.append("id", formData.id)
            form.append("title", formData.title)
            form.append("content", formData.content)
            form.append("image", formData.image)

            console.log(formData)
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

            closeModal(); 
            // PERLU PERBAIKAN, KARENA YANG DI EDIT KAN BUKAN SELALU HALAMAN KE-1
            await fetchNotes(`page=${filter.page}&limit=${filter.limit}`);

        }catch(err){
            setError(err.message);
        }finally{
            setLoad(false)
        }
    }

    const deleteNote = async (note) => {
        const confirm = window.confirm("Are you sure you want to delete this note ?")
        if(!confirm) return;
        const {id} = note;

        setLoad(true)
        try{
            const delNote = await fetch(`http://localhost:3000/notes/${id}`, {
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            const respon = await delNote.json();

            if(!delNote.ok){
                throw new Error(respon.message)
            }
            //TIDAK SEMUA HALAMAN YANG TELAH DIHALAMAN KE-1, JADI PERLU PERBAIKAN LAGI
            await fetchNotes(`page=${filter.page}&limit=${filter.limit}`);
        }catch(err){
            setError(err.message)
        }finally{
            setLoad(false)
        }
        
    }

    const changePage = (newPage) => {
        setFilter(prev => ({...prev, page : newPage}))
    }

    const changeSearch = ({keyword, e}) => {
        e.preventDefault();
        setFilter(prev => ({...prev, search : keyword, page : 1}))
    }

    const changeSort = (type) => {
        setFilter(prev => ({...prev, sort : type, page : 1}))
    }
    const resetValueSearch = () => {
        setFilter(prev => ({...prev, search : "", page : 1}))
    }

    return {
        notes,
        load,
        error,
        filter, 
        fetchNotes,
        createNote,
        editNote,
        deleteNote,
        changePage,
        changeSearch,
        changeSort,
        resetValueSearch
    }
}

