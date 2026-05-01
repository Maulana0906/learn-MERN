import Button from "./Button.jsx";

function Sorting({changeSort}){
    return <div className="w-1/5 ml-1 my-4 h-10 flex justify-center gap-3 rounded-sm shadow-sm shadow-stone-300">
        <Button content="a - z" type="sortingBtn" onClick={changeSort} keyword={"asc"}/>
        <Button content="z - a" type="sortingBtn" onClick={changeSort} keyword={"desc"}/>
        <Button content="News" type="sortingBtn" onClick={changeSort} keyword={"newest"}/>
        <Button content="Olds" type="sortingBtn" onClick={changeSort} keyword={"olds"}/>
    </div>
}
export default Sorting;