import {useState} from 'react';


const useFormNote = () => {
    const [formData, setFormData] = useState({
        title : "",
        content : "",
        image : null
    })

    const changeForm = (e) => {
        const {name, value, files} = e.target;

        if(name === "image"){
            setFormData({...formData, image : files[0]})
        }else{
            setFormData({...formData, [name] : value})
        }
    }

    const resetForm = () => {
        setFormData({
            title : "",
            content : "",
            image : null
        })
    }

}