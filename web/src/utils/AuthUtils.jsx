export const AuthUtils = ()=>{
    const getNewAccessToken = async () => {
        try{
            const res = await fetch(`http://localhost:3000/user/access_token`, {
                        method : "GET",
                        credentials: "include"
            })
            const data = await res.json();

            localStorage.setItem("accessToken" , data.accessToken)
        }catch(err){
            throw err
        }
    }   
    return {
        getNewAccessToken
    }
}