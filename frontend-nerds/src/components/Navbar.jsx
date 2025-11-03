import { useState } from 'react'
import logo from '../assets/logo.png';

const  Navbar = ()=> {
  return (
    <div className=' container mx-auto my-5 max-h-[80px] w-full  flex justify-between '>
    <div className="nav flex gap-15">
    <div className="brand h-full">
        <img className='h-[50px] logo' src={logo} alt=""  />
    </div>
    <nav className="flex poppins-regular">
        <ul className="flex gap-10 items-center poppins-regular">
            <li className="py-2">Home</li>
            <li className="py-2">Service</li>
            <li className="py-2">About us</li>
            <li className="py-2">Our purpose</li>
        </ul>
    </nav>
    </div>
    <div className="flex">
        <ul className="flex gap-3 items-center justify-center">
            <li className="py-1.5 px-5 border-[1px] border-blue-400 text-blue-500 rounded-full font-semibold">Sign Up</li>
            <li className="py-2 px-5 bg-blue-500 text-white rounded-full font-semibold text-center">Become an Expert</li>
            
        </ul>
    </div>
    </div>
  )
}

export default Navbar;
