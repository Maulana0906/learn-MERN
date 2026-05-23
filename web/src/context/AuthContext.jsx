import { createContext, useContext, useState, useEffect } from "react";
import { AuthUtils } from '../utils/AuthUtils.jsx';


const AuthContext = createContext(null)

export function AuthProvider ({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {getNewAccessToken} = AuthUtils(); 

    useEffect(() => {
        const getMe = async () => {
            try{
                const res = await fetch("http://localhost:3000/user/me", {
                        method : "GET",
                        headers : {
                            authorization : `Bearer ${localStorage.getItem("accessToken")}`
                        }
                    })
                const data = await res.json();
                if(res.status === 401 && data.expired){
                    await getNewAccessToken()
                    
                    return await getMe()
                }

                if(!res.ok){
                    throw new Error(data.message)
                }

                setUser(data)
            }catch(err){
                setUser(null)
            }
        } 
        const initializeAuth = async () => {
            setIsLoading(true)

            await getMe()

            setIsLoading(false)
        }

    initializeAuth()
    }, [])


    const login = (userData, accessToken) => {
        localStorage.setItem("accessToken" , accessToken)
        setUser(userData)
    }

    const logout = async () => {
        await fetch("http://localhost:3000/user/logout", {
            method : "POST",
        })
        localStorage.removeItem("accessToken")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{setUser, user, setIsLoading, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);