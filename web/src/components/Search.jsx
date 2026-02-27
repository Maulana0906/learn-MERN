import {useState} from "react"

function Search({searchNotes, resetValueSearch}){
    const [formData, setFormData] = useState({
        content : ""
    })
    return (
        <div>
            <form className="flex items-center gap-1" onSubmit={(e) => searchNotes(formData, e)}>
                <input type="text" className="h-8 border-2 border-gray-700 px-2 rounded-sm bg-gray-100 "
                    value={formData.content} onChange={(e) => {
                            if(e.target.value.length < 1){
                                resetValueSearch({page:1, limit:5})
                            }
                            setFormData({...formData, content : e.target.value})
                        }
                    } required placeholder="Search . . ."/>
                <button type="submit" className="h-8 rounded-sm px-2 shadow-sm font-semibold tracking-wide text-sm my-2 leading-4 cursor-pointer bg-blue-500 text-white"> Search </button>
            </form>        
        </div>
    )
}
export default Search;



// KETIKA HASIL DARI SEARCH NULL MAKA BUAT UI NYA DAN PERBAIKI BUG PAGINATION NYA JUGA