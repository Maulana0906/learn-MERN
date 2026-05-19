import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"


function AuthGuard ({children}){
    const {user, isLoading} = useAuth();

    if(isLoading){
        return <div className="loader absolute top-1/2 left-1/2 -translate-x-1/2"></div>;
    }

    if(!user){
        return <Navigate to="/login"/>
    }

    return children
}
export default AuthGuard;