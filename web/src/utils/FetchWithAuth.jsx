export const FetchWithAuth = async (url, options={}) => {
    let accessToken = localStorage.getItem("accessToken");
    const getNewAccessToken = async () => {
        try{
            const res = await fetch(`http://localhost:3000/user/access_token`, {
                        method : "GET",
                        credentials: "include"
            })
            const data = await res.json();

            localStorage.setItem("accessToken" , data.accessToken)
            accessToken = data.accessToken;
        }catch(err){
            throw err
        }
    } 

    options.headers = {
        ...options.headers,
        authorization : `Bearer ${accessToken}`
    }
    
    let res = await fetch(url, options)
    let data = await res.json()
    
    if(res.status === 401 && data.expired){
        await getNewAccessToken()
        
        options.headers = {
            ...options.headers,
            authorization : `Bearer ${accessToken}`
        }
        
        res = await fetch(url, options)
        data = await res.json()
    }

    if(!res.ok){
        throw new Error(data.message)
    }

    return data;
      
}