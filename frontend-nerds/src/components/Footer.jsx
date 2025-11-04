import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import logo from "../assets/logo.png"; // your logo here
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
const Footer = () => {
  return (
    <footer className="bg-[#121212] text-white py-14 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Left Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-15 w-auto" />
          </div>

          <p className="text-sm text-gray-300">
            Copyright © 2025 Nerdwave Team
          </p>

          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-blue-400 transition">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <SiGmail />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div>
          <h3 className="font-semibold mb-4">Feature</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Payments</li>
            <li>Security</li>
            <li>Empowering</li>
            <li>Checkout</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Why Local Fixperts?</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Why us?</li>
            <li>Steps</li>
            <li>Convenience</li>
            <li>Diverse services</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Help</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Get support</li>
            <li>Contact an Expert</li>
            <li>Privacy policy</li>
            <li>Checkout</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <Link
              to="about" // Matches the id="about" in your section
              smooth={true} // Enables smooth scrolling
              duration={600} // Scroll duration (ms)
              offset={-80} // Adjust for fixed navbar height
              className="cursor-pointer hover:text-blue-600 transition"
            >
              About Us
            </Link>
            <li>
              <Link
                to="services" // Matches the id="about" in your section
                smooth={true} // Enables smooth scrolling
                duration={600} // Scroll duration (ms)
                offset={-80} // Adjust for fixed navbar height
                className="cursor-pointer hover:text-blue-600 transition"
              >
                Services
              </Link>
            </li>
            <li>
              <NavLink to="/expert">Become an Expert</NavLink>
            </li>
            <li>Customer</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
