import {useState} from "react"

function Search({changeSearch, resetValueSearch}){
    const [keyword, setKeyword] = useState("")
    return (
        <div>
            <form className="flex items-center gap-1" onSubmit={(e) => changeSearch({keyword, e})}>
                <input type="text" className="h-8 border-2 border-gray-700 px-2 rounded-sm bg-gray-100 "
                    name ="content"
                    value={keyword} 
                    onChange={(e) => {
                            if(e.target.value.length < 1){
                                resetValueSearch()
                            }
                            setKeyword(e.target.value)   
                        }
                    } required placeholder="Search . . ."/>
                <button type="submit" className="h-8 rounded-sm px-2 shadow-sm font-semibold tracking-wide text-sm my-2 leading-4 cursor-pointer bg-blue-500 text-white"> Search </button>
            </form>        
        </div>
    )
}
export default Search;
