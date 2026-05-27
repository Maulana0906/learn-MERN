import { useAuth } from "../../context/AuthContext";
import { FetchWithAuth } from "../../utils/fetchWithAuth";
import { useNavigate } from "react-router-dom"

export const HooksAuth = () => {
    const {login, logout, setIsLoading} = useAuth();
    const navigate = useNavigate();

    const loginUser = async (user, e) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            
            const postLogin = await fetch("http://localhost:3000/user/login", {
                method : "POST",
                credentials: "include",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(user)
            })

            const respon = await postLogin.json(); 
            
            if(!postLogin.ok){
                throw new Error(respon.message)
            }

            const getMe = await fetch("http://localhost:3000/user/me", {
                method : "GET",
                headers : {
                    authorization : `Bearer ${respon.accessToken}`
                }
            })
            const profile = await getMe.json()

            login(profile, respon.accessToken)

        }catch(err){
            throw err
        }finally{
            setIsLoading(false)
        }


    } 
    const registerUser = async (user, e) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            const postRegister = await fetch("http://localhost:3000/user/register", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(user)
            })

            const respon = await postRegister.json();

            if(!postRegister.ok){
                throw new Error(respon.message)
            }
        setIsLoading(false)
        
        localStorage.setItem("alertRegister", "Successfully registered, please login");
        navigate("/login")
        }catch(err){
            console.log(err)
        }
    }

    const logoutUser = async () => {
        try{    
            const res = FetchWithAuth("http://localhost:3000/user/logout", {
                method : "POST",
                credentials: "include",
                headers : {
                    "Content-Type" : "application/json"
                }
            }) 

            const askConfirm = confirm("Are you sure ?")
            
            if(askConfirm){
                logout();
            }

        }catch(err){
            console.log(err)
        }
    }
    return {
        loginUser,
        registerUser,
        logoutUser
    }
}