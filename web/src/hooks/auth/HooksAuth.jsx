import { useAuth } from "../../context/AuthContext";

export const HooksAuth = () => {
    const {login, setIsLoading} = useAuth();

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
            console.log(respon)
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
            console.log(profile)

            login(profile, respon.accessToken)

        }catch(err){
            console.log(err)
            // alert(err)
        }finally{
            setIsLoading(false)
        }


    } 



    return {
        loginUser
    }
}