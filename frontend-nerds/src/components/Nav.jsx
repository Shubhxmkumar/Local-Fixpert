import logo from "../assets/logo.png";

const Nav = ({ step }) => {
  const active = "bg-blue-600 text-white";
  const inactive = "bg-gray-300 text-gray-700";

  return (
    <header className="w-full shadow-sm bg-white  ">
      <div className="flex w-full justify-evenly items-center py-3">
        <img src={logo} alt="Logo" className="h-[50px]" />

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
