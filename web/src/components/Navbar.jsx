import '../App.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { HooksAuth } from '../hooks/auth/hooksAuth';


function Navbar() {
   const {logoutUser} = HooksAuth();
    return (
        <nav className='w-ful h-10 flex justify-between items-center px-6 bg-orange-100'>   
            <h1 className='text-xl font-semibold'>Indocom</h1>
            <ul className='flex gap-10'>
               <Link to='/'>Home</Link>
               <Link to='/daily_notes'>Daily Notes</Link>
               <Link to='/setting'>Setting</Link>
               <Link>
                    <button className="bg-red-400 text-white font-medium tracking-wide px-1 py-0.5 rounded-md shadow-sm shadow-gray-500 cursor-pointer"
                        onClick={logoutUser}>
                            Logout
                    </button>
               </Link>
            </ul>
        </nav>
    )
}

export default Navbar;