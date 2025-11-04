import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Nav = ({ step }) => {
  const active = "bg-blue-600 text-white";
  const inactive = "bg-gray-300 text-gray-700";

  return (
    // Fixed Navbar stays visible, but we ensure proper height & shadow
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      <div className="flex flex-col sm:flex-row w-full justify-between sm:justify-evenly items-center py-4 px-4 gap-3">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 sm:h-[50px]" />
        </div>
>>>>>>> 0d2e530 (fully backed and some frontend file uploaded)

        {/* Steps Section */}
        <div className="flex gap-2 sm:gap-4 bg-gray-200 w-full sm:w-[50%] rounded-full justify-between px-2 py-1">
          <button
            className={`flex-1 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              step === 1 ? active : inactive
            }`}
          >
            Step 1
          </button>
          <button
            className={`flex-1 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              step === 2 ? active : inactive
            }`}
          >
            Step 2
          </button>
          <button
            className={`flex-1 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              step === 3 ? active : inactive
            }`}
          >
            Step 3
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
