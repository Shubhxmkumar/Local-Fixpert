// import { useState } from 'react'
// import logo from '../assets/logo.png';
// import { GiHamburgerMenu } from "react-icons/gi";
// import { ImCross } from "react-icons/im";
// const  Navbar = ()=> {
//     const [show, setshow] = useState(false);
//   return (
//     <div className=' container mx-auto my-5 max-h-[80px] w-full  flex justify-between '>
//     <div className="nav flex gap-15">
//     <div className="brand h-full">
//         <img className='h-[50px] logo' src={logo} alt=""  />
//     </div>
//          {show?<p onClick={()=>setshow(!show)}><ImCross/></p>:<p onClick={()=>setshow(!show)}><GiHamburgerMenu /></p>}
//     <div>
//     <div>
//     {show && 
//     <div className="mobiledesign absolute left-0 top-20"> 
//              <nav className="flex poppins-regular flex-col">
//         <ul className="flex gap-10 flex-col items-center poppins-regular">
//             <li className="py-2">Home</li>
//             <li className="py-2">Service</li>
//             <li className="py-2">About us</li>
//             <li className="py-2">Our purpose</li>
//         </ul>
//     </nav>
    
//     <div className="flex">
//         <ul className="flex gap-3 items-center justify-center">
//             <li className="py-1.5 px-5 border-[1px] border-blue-400 text-blue-500 rounded-full font-semibold">Sign Up</li>
//             <li className="py-2 px-5 bg-blue-500 text-white rounded-full font-semibold text-center">Become an Expert</li>
            
//         </ul>
//     </div>
//     </div>
//     }
//     {/* For desktop design */}
//     <div className="desktopdesign hidden md:block">
//     <nav className="flex poppins-regular">
//         <ul className="flex gap-10 items-center poppins-regular">
//             <li className="py-2">Home</li>
//             <li className="py-2">Service</li>
//             <li className="py-2">About us</li>
//             <li className="py-2">Our purpose</li>
//         </ul>
//     </nav>
    
//     <div className="flex">
//         <ul className="flex gap-3 items-center justify-center">
//             <li className="py-1.5 px-5 border-[1px] border-blue-400 text-blue-500 rounded-full font-semibold">Sign Up</li>
//             <li className="py-2 px-5 bg-blue-500 text-white rounded-full font-semibold text-center">Become an Expert</li>
            
//         </ul>
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>
//   )
// }

// export default Navbar;

// import { useState } from "react";
// import logo from "../assets/logo.png";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { ImCross } from "react-icons/im";
// import { NavLink } from "react-router-dom";

// const Navbar = () => {
//   const [show, setShow] = useState(false);

//   return (
//     <header className="w-full shadow-sm bg-white fixed top-0 left-0 z-50">
//       <div className="container mx-auto flex justify-between items-center px-6 md:px-10 py-4">
//         {/* Brand / Logo */}
//         <div className="flex items-center gap-3">
//           <img src={logo} alt="Logo" className="h-[50px]" />
//         </div>

//         {/* Hamburger / Cross Icon (Mobile Only) */}
//         <div className="md:hidden text-2xl cursor-pointer text-gray-700" onClick={() => setShow(!show)}>
//           {show ? <ImCross /> : <GiHamburgerMenu />}
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center justify-between gap-10">
//           <ul className="flex gap-8 text-gray-700 font-medium poppins-regular">
//             <li className="cursor-pointer hover:text-blue-600 transition">
//             <NavLink to='/'>Home<NavLink/>
//             </li>
//             <li className="cursor-pointer hover:text-blue-600 transition">
//             <NavLink></NavLink>Service</li>
//             <li className="cursor-pointer hover:text-blue-600 transition">
//             <NavLink></NavLink>About Us</li>
//             <li className="cursor-pointer hover:text-blue-600 transition">
//             <NavLink></NavLink>Our Purpose</li>
//           </ul>

//           <div className="flex gap-4">
//             <button className="py-2 px-5 border border-blue-500 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition">
//               Sign Up
//             </button>
//             <button className="py-2 px-5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
//               Become an Expert
//             </button>
//           </div>
//         </nav>
//       </div>

//       {/* Mobile Menu */}
//       {show && (
//         <div className="md:hidden absolute top-[70px] left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out">
//           <nav className="flex flex-col items-center py-5 gap-4 text-gray-700 font-medium poppins-regular">
//             <ul className="flex flex-col gap-4 items-center">
//               <li className="cursor-pointer hover:text-blue-600 transition">Home</li>
//               <li className="cursor-pointer hover:text-blue-600 transition">Service</li>
//               <li className="cursor-pointer hover:text-blue-600 transition">About Us</li>
//               <li className="cursor-pointer hover:text-blue-600 transition">Our Purpose</li>
//             </ul>

//             <div className="flex flex-col gap-3 mt-4 w-full px-6">
//               <button className="py-2 border border-blue-500 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition">
//                 Sign Up
//               </button>
//               <button className="py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
//                 Become an Expert
//               </button>
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

import { useState } from "react";
import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <header className="w-full shadow-sm bg-white fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-10 py-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-[50px]" />
        </div>

        {/* Hamburger / Cross Icon (Mobile Only) */}
        <div
          className="md:hidden text-2xl cursor-pointer text-gray-700"
          onClick={() => setShow(!show)}
        >
          {show ? <ImCross /> : <GiHamburgerMenu />}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-between gap-10">
          <ul className="flex gap-8 text-gray-700 font-medium poppins-regular">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `cursor-pointer hover:text-blue-600 transition ${
                    isActive ? "text-blue-600 font-semibold" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `cursor-pointer hover:text-blue-600 transition ${
                    isActive ? "text-blue-600 font-semibold" : ""
                  }`
                }
              >
                Service
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `cursor-pointer hover:text-blue-600 transition ${
                    isActive ? "text-blue-600 font-semibold" : ""
                  }`
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/purpose"
                className={({ isActive }) =>
                  `cursor-pointer hover:text-blue-600 transition ${
                    isActive ? "text-blue-600 font-semibold" : ""
                  }`
                }
              >
                Our Purpose
              </NavLink>
            </li>
          </ul>

          <div className="flex gap-4">
            <button className="py-2 px-5 border border-blue-500 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition">
              Sign Up
            </button>
            <button className="py-2 px-5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
              Become an Expert
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {show && (
        <div className="md:hidden absolute top-[70px] left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out">
          <nav className="flex flex-col items-center py-5 gap-4 text-gray-700 font-medium poppins-regular">
            <ul className="flex flex-col gap-4 items-center">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setShow(false)}
                  className={({ isActive }) =>
                    `cursor-pointer hover:text-blue-600 transition ${
                      isActive ? "text-blue-600 font-semibold" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  onClick={() => setShow(false)}
                  className={({ isActive }) =>
                    `cursor-pointer hover:text-blue-600 transition ${
                      isActive ? "text-blue-600 font-semibold" : ""
                    }`
                  }
                >
                  Service
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={() => setShow(false)}
                  className={({ isActive }) =>
                    `cursor-pointer hover:text-blue-600 transition ${
                      isActive ? "text-blue-600 font-semibold" : ""
                    }`
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/purpose"
                  onClick={() => setShow(false)}
                  className={({ isActive }) =>
                    `cursor-pointer hover:text-blue-600 transition ${
                      isActive ? "text-blue-600 font-semibold" : ""
                    }`
                  }
                >
                  Our Purpose
                </NavLink>
              </li>
            </ul>

            <div className="flex flex-col gap-3 mt-4 w-full px-6">
              <button className="py-2 border border-blue-500 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition">
                Sign Up
              </button>
              <button className="py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
                Become an Expert
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
