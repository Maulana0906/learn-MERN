import { createContext, useContext, useState, useEffect } from "react";
import { FetchWithAuth } from "../utils/fetchWithAuth.jsx";


const AuthContext = createContext(null)

export function AuthProvider ({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getMe = async () => {
            try{
                const res = await FetchWithAuth("http://localhost:3000/user/me", {
                        method : "GET"
                    })
                setUser(res)
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