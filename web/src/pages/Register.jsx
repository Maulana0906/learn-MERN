import {HooksAuth} from "../hooks/auth/HooksAuth";
import {UseFormAuth} from "../hooks/auth/UseFormAuth.jsx";

function Register(){
    const {registerUser} = HooksAuth();
    const {formData, changeForm} = UseFormAuth()

    return (
        <div>
            <h1 className="text-center text-lg font-semibold">Register</h1>
            <form onSubmit={(e) => registerUser(formData, e)} className="w-1/3 mx-auto">
                <label htmlFor="title" className="flex gap-5 mt-10">
                    Username : 
                    <input type="text" className="w-3/4 border-2 border-gray-700 px-2 py-0.5 rounded-sm bg-gray-100" 
                        name = "username"
                        value={formData.username}
                        onChange={(e) => 
                            changeForm(e)
                        } required />
                </label>
                <label htmlFor="title" className="flex gap-5 mt-10">
                    Password : 
                    <input type="text" className="w-3/4 border-2 border-gray-700 px-2 py-0.5 rounded-sm bg-gray-100" 
                        name = "password"
                        value={formData.password}
                        onChange={(e) => 
                            changeForm(e)
                        } required />
                </label>
                <button type="submit" className="inline mt-5 rounded-md px-2 py-2 shadow-sm font-semibold tracking-wide text-sm my-2 leading-4 cursor-pointer bg-blue-500 text-white"> Register </button>
            </form>
        </div>
    )

}

export default Register;