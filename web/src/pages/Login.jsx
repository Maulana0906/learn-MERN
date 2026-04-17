import {useState} from "react";

function Login(){
    const [formData, setFormData] = useState({
        username : "",
        password: ""
    })

    function validationLogin(formData, event){
        event.preventDefault();

        const fetch = async () => {
            try{
                const res = await fetch('');

            }catch(e){

            }
        }
    } 

    return (
        <div>
            <form onSubmit={(e) => validationLogin(formData, e)}>
                <label htmlFor="title" className="flex gap-5 mt-10">
                    Username : 
                    <input type="text" className="w-3/4 border-2 border-gray-700 px-2 py-0.5 rounded-sm bg-gray-100" 
                        onChange={(e) => 
                            setFormData({...formData, username : e.target.value})
                        } required />
                </label>
                <label htmlFor="title" className="flex gap-5 mt-10">
                    Password : 
                    <input type="text" className="w-3/4 border-2 border-gray-700 px-2 py-0.5 rounded-sm bg-gray-100" 
                        onChange={(e) => 
                            setFormData({...formData, password : e.target.value})
                        } required />
                </label>
                <button type="submit" className="block mt-5 rounded-md px-2 py-2 shadow-sm font-semibold tracking-wide text-sm my-2 leading-4 cursor-pointer bg-blue-500 text-white"> Save changes </button>
            </form>
        </div>
    )

}

export default Login;