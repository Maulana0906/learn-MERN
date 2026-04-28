import {useState} from 'react';


export const useFormNote = () => {
    const [formData, setFormData] = useState({
        id : "",
        title : "",
        content : "",
        image : ""
    })

    const changeForm = (e) => {
        const {name, value, files} = e.target;
        
        setFormData(prev => ({
            ...prev, image : (name === "image") ? (files ? files[0] : value) : prev.image,
            ...(name !== "image" && {[name] : value}) 
        }))
    }

    const resetForm = () => {
        setFormData({
            title : "",
            content : "",
            image : null
        })
    }

    return {
        formData,
        changeForm,
        resetForm
    }
}