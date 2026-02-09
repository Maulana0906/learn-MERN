import '../App.css'
function Navbar() {
    return (
        <nav className='w-ful h-10 flex justify-between items-center px-6 bg-red-200'>   
            <h1 className='text-xl font-semibold'>Indocom</h1>
            <ul className='flex gap-10'>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/notes">Daily notes</a>
                </li>
                <li>
                    <a href="/setting">Setting</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;