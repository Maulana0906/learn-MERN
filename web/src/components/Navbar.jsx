import '../App.css'
import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <nav className='w-ful h-10 flex justify-between items-center px-6 bg-orange-100'>   
            <h1 className='text-xl font-semibold'>Indocom</h1>
            <ul className='flex gap-10'>
               <Link to='/'>Home</Link>
               <Link to='/daily_notes'>Daily Notes</Link>
               <Link to='/setting'>Setting</Link>
            </ul>
        </nav>
    )
}

export default Navbar;