import Button from "./Button.jsx";

function Sorting({handleSorting}){
    return <div className="w-1/5 ml-1 my-4 h-10 flex justify-center gap-3 rounded-sm shadow-sm shadow-stone-300">
        <Button content="a - z" type="sortingBtn" typeButton="asc" onClickModal={handleSorting}/>
        <Button content="z - a" type="sortingBtn" typeButton="desc" onClickModal={handleSorting}/>
        <Button content="News" type="sortingBtn" typeButton="news" onClickModal={handleSorting}/>
        <Button content="Olds" type="sortingBtn" typeButton="olds" onClickModal={handleSorting}/>
    </div>
}
export default Sorting;