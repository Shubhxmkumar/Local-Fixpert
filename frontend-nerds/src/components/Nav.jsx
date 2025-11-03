import logo from "../assets/logo.png";

const Nav = ({ step }) => {
  const active = "bg-blue-600 text-white";
  const inactive = "bg-gray-300 text-gray-700";

  return (
    <header className="w-full shadow-sm bg-white  ">
      <div className="flex w-full justify-evenly items-center py-3">
        <img src={logo} alt="Logo" className="h-[50px]" />

        <div className="flex gap-4 bg-gray-200 w-[50%] rounded-full justify-between px-2">
          <button className={`px-6 py-2 rounded-full text-sm font-medium ${step === 1 ? active : inactive}`}>Step 1</button>
          <button className={`px-6 py-2 rounded-full text-sm font-medium ${step === 2 ? active : inactive}`}>Step 2</button>
          <button className={`px-6 py-2 rounded-full text-sm font-medium ${step === 3 ? active : inactive}`}>Step 3</button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
