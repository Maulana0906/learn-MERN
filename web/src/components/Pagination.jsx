function Pagination({page, limit, totalNotes, switchPage}) {
    const totalPage = Math.ceil(totalNotes/limit);
    const numberPage = [];
    
    for(let i=1; i<=totalPage; i++){
        numberPage.push(i);
    }
    
    // pagination window
    const windowSize = 5;
    const totalBlock = Math.ceil(totalPage/windowSize)
    const currentBlock = totalNotes < 1 ? 0 : Math.ceil(Number(page)/windowSize) 
    const startPage =  (currentBlock-1)*windowSize + 1;
    const endPage = Math.min(startPage + windowSize - 1, totalPage);
    const visiblePages = numberPage.filter(el => el >= startPage && el <= endPage);

    let isLastPage = false;
    numberPage.forEach(el => {
        if((Number(page)+1) === Number(el)){
            isLastPage = true;
        }
    })

    return (
        <ul className=" w-20 flex gap-5 mx-auto -translate-x-1/2 mt-20">
            <button className={Number(page)-1 === 0 ? "hidden" : "cursor-pointer"} onClick={() => switchPage({page : (Number(page)-1), limit})}> Previous </button>
            <button className={currentBlock <= 1  ? "hidden" : "cursor-pointer text-blue-700"} onClick={() => switchPage({page : ((currentBlock-1)*windowSize), limit})}>.....</button>
            {
                visiblePages.map((el, i) =>{
                    if(Number(el) === Number(page) ){
                        // active page 
                        return <li key={el} className='cursor-pointer text-blue-500 border-b-2 border-blue-500'>{el}</li>
                    }
                    
                    // non active page
                    return <button key={el} className='cursor-pointer' onClick={() => switchPage({page : (Number(el)), limit})} >{el}</button>
                })
            }
            <button className={totalBlock === currentBlock  ? "hidden" : "cursor-pointer text-blue-700"} onClick={() => switchPage({page : (currentBlock*windowSize+1), limit})}>.....</button>
            <button className={!isLastPage ? "hidden" : "block cursor-pointer"} onClick={() => switchPage({page : (Number(page)+1), limit})}>Next </button>
        </ul>
    )
}

export default Pagination;