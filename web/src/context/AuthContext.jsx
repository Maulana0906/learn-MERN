import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null)

export function AuthProvider ({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getMe = async () => {
            try{
                const res = await fetch("http://localhost:3000/user/me", {
                        method : "GET",
                        headers : {
                            authorization : `Bearer ${localStorage.getItem("accessToken")}`
                        }
                    })
                
                if(!res.ok){
                    throw new Error("Unauthorized")
                }
                const userData = res.json();
                setUser(userData)
            }catch(err){
                setUser(null)
            }finally{
                setIsLoading(false)
            }
        } 
        getMe()
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