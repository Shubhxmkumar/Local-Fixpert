import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdown(false);
  };

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "Services", to: "services" },
    { name: "About Us", to: "about" },
  ];

  return (
<<<<<<< HEAD
    <header className="w-full shadow-sm bg-white fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-10 py-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-[50px]" />
=======
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-15" />
>>>>>>> c77ca2e (final commit)
        </div>

        {/* Hamburger Menu for Mobile */}
        <div
          className="md:hidden text-2xl cursor-pointer text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <ImCross /> : <GiHamburgerMenu />}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex gap-8 text-gray-700 font-medium poppins-regular">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  spy={true}
                  activeClass="active"
                  className="relative cursor-pointer transition duration-300 
                    hover:text-blue-600 
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 
                    after:w-0 after:h-[2px] after:bg-blue-600 
                    hover:after:w-full after:transition-all after:duration-300 
                    [&.active]:text-blue-600 [&.active]:after:w-full"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side Buttons */}
          {!user ? (
            <div className="flex gap-4">
              <NavLink to="/signup">
                <button className="py-2 px-5 border border-blue-500 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition duration-300 backdrop-blur-sm">
                  Sign Up
                </button>
              </NavLink>
              <NavLink to="/expert">
                <button className="py-2 px-5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition duration-300 shadow-sm backdrop-blur-sm">
                  Become an Expert
                </button>
              </NavLink>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
              >
                <FaUserCircle size={30} className="text-blue-600" />
                <span className="font-semibold">{user.name}</span>
              </button>

              {/* Dropdown */}
              {dropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white/80 backdrop-blur-lg shadow-lg rounded-xl border border-white/30 overflow-hidden z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                    onClick={() => setDropdown(false)}
                  >
                    My Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                    onClick={() => setDropdown(false)}
                  >
                    My Bookings
                  </button>
                  <hr />
                  <button
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-[70px] left-0 w-full bg-white/70 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out border-t border-white/20">
          <nav className="flex flex-col items-center py-5 gap-4 text-gray-700 font-medium poppins-regular">
            <ul className="flex flex-col gap-4 items-center">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={600}
                    offset={-80}
                    spy={true}
                    activeClass="active"
                    onClick={() => setMenuOpen(false)}
                    className="relative cursor-pointer transition duration-300 
                      hover:text-blue-600 
                      after:content-[''] after:absolute after:left-0 after:-bottom-1 
                      after:w-0 after:h-[2px] after:bg-blue-600 
                      hover:after:w-full after:transition-all after:duration-300 
                      [&.active]:text-blue-600 [&.active]:after:w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {!user ? (
              <div className="flex flex-col gap-3 mt-4 w-full px-6">
                <NavLink to="/signup">
                  <button className="py-2 border border-blue-500 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition duration-300 backdrop-blur-sm">
                    Sign Up
                  </button>
                </NavLink>
                <NavLink to="/expert">
                  <button className="py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition duration-300 shadow-sm backdrop-blur-sm">
                    Become an Expert
                  </button>
                </NavLink>
              </div>
            ) : (
              <div className="flex flex-col items-center mt-4">
                <FaUserCircle size={40} className="text-blue-600 mb-2" />
                <p className="font-semibold text-gray-700">{user.name}</p>
                <button
                  onClick={handleLogout}
                  className="text-red-500 text-sm mt-2 underline"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
