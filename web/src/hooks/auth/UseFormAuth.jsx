import {useState} from 'react';

export const UseFormAuth = () => {
    const [formData, setFormData] = useState({
        username : "",
        password : ""
    })

    const changeForm = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name] : value}))
    }

    return {
        formData,
        changeForm
    }
}