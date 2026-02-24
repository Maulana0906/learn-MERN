function Pagination({page, limit, notes, switchPage}) {
    const totalPage = Math.ceil(notes/limit);
    const numberPage = [];

    for(let i=1; i<=totalPage; i++){
        numberPage.push(i);
    }
    return (
        <ul className=" w-20 flex gap-5 mx-auto -translate-x-1/2 mt-20">
            <button className="cursor-pointer">Previous</button>
            {
                numberPage.map((el, i) =>{
                    if(Number(el) === Number(page)){
                        return <li key={el} className='cursor-pointer text-blue-500 border-b-2 border-blue-500'>{el}</li>
                    }
                    return <button key={el} className='cursor-pointer' onClick={() => switchPage({page : (Number(page)), limit})} >{el}</button>
                })
            }
            <button className="cursor-pointer">Next</button>
        </ul>
    )
}

export default Pagination;