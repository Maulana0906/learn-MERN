import {Navigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

function GuestGuard({children}){
    const {user, isLoading} = useAuth();

    if(isLoading){
        return <div className="loader absolute top-1/2 left-1/2 -translate-x-1/2"></div>;
    }

    if(user){
        return <Navigate to="/"/>
    }
    return children
}
export default GuestGuard;