
function CreateContent({createNote, hookForm, closeModal}){
     const {formData, changeForm, resetForm} = hookForm();
    return <div className="p-5">
            <h1 className="font-semibold text-lg text-gray-700">Create new Note</h1>
            <form onSubmit={(e) => createNote({formData, resetForm, closeModal}, e)}>
                <label htmlFor="title" className="flex gap-5 mt-10">
                    Title : 
                    <input type="text" className="w-3/4 border-2 border-gray-700 px-2 py-0.5 rounded-sm bg-gray-100" 
                        name="title"
                        value={formData.title}
                        onChange={(e) => changeForm(e)} required />
                </label>
                <label htmlFor="content" className="flex gap-5 mt-5">
                    Content : 
                    <input type="text" className="w-3/4 border-2 border-gray-700 px-2 py-0.5 rounded-sm bg-gray-100 "
                        name="content"
                        value={formData.content}
                        onChange={(e) => changeForm(e)} required/>
                </label>
                <input className="w-3/4 border-2 border-gray-700 px-2 py-0.5 rounded-sm bg-gray-100 mt-5 cursor-pointer" type="file" 
                    name="image"
                    onChange={(e) => changeForm(e)} />
                <button type="submit" className="block mt-5 rounded-md px-2 py-2 shadow-sm font-semibold tracking-wide text-sm my-2 leading-4 cursor-pointer bg-blue-500 text-white"> Save changes </button>
            </form>
    </div>
}
export default CreateContent;