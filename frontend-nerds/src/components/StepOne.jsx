import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import logo from "../assets/logo.png";

const StepOne = ({ onNext }) => {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");

  return (
    <>
    <Nav/>
    <div className="min-h-screen bg-[#F6FAFF] flex flex-col items-center pt-10 mt-10">
      {/* Steps Navigation */}
      <p className="text-sm text-gray-600 mb-6">Describe the task</p>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-10">
        STEP 1 — Describe your task
      </h2>

      {/* Form Container */}
      <div className="w-full max-w-xl bg-white border border-blue-400 rounded-2xl p-8 shadow-sm">
        {/* Location */}
        <div className="mb-6">
          <label className="font-semibold text-gray-700 block mb-2">
            Enter your location
          </label>
          <input
            type="text"
            placeholder="Eg. village Bagrian, Attari, asr"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-full border border-gray-200 px-5 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Service */}
        <div className="mb-10">
          <label className="font-semibold text-gray-700 block mb-2">
            Selected service
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-full border border-gray-200 px-5 py-3 outline-none focus:border-blue-500"
          >
            <option>Eg. Plumber</option>
            <option>Electrician</option>
            <option>Cleaner</option>
            <option>Painter</option>
          </select>
        </div>

        {/* Next Button */}
        <button
          onClick={() => onNext({ location, service })}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full mx-auto transition"
        >
          Next <IoChevronForward size={18} />
        </button>
      </div>
    </div>
    </>
  );
};
const StepTwo = ({ onNext }) => {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");

  return (
    <>
    <Nav/>
    <div className="min-h-screen bg-[#F6FAFF] flex flex-col items-center pt-10">
      {/* Steps Navigation */}

    

      <p className="text-sm text-gray-600 mb-6">Describe the task</p>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-10">
        STEP 1 — Describe your task
      </h2>

      {/* Form Container */}
      <div className="w-full max-w-xl bg-white border border-blue-400 rounded-2xl p-8 shadow-sm">
        {/* Location */}
        <div className="mb-6">
          <label className="font-semibold text-gray-700 block mb-2">
            Enter your location
          </label>
          <input
            type="text"
            placeholder="Eg. village Bagrian, Attari, asr"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-full border border-gray-200 px-5 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Service */}
        <div className="mb-10">
          <label className="font-semibold text-gray-700 block mb-2">
            Selected service
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-full border border-gray-200 px-5 py-3 outline-none focus:border-blue-500"
          >
            <option>Eg. Plumber</option>
            <option>Electrician</option>
            <option>Cleaner</option>
            <option>Painter</option>
          </select>
        </div>

        {/* Next Button */}
        <button
          onClick={() => onNext({ location, service })}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full mx-auto transition"
        >
          Next <IoChevronForward size={18} />
        </button>
      </div>
    </div>
    </>
  );
};
const StepThree= ({ onNext }) => {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");

  return (
    <>
    <Nav/>
    <div className="min-h-screen bg-[#F6FAFF] flex flex-col items-center pt-10">
      {/* Steps Navigation */}

    

      <p className="text-sm text-gray-600 mb-6">Describe the task</p>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-10">
        STEP 1 — Describe your task
      </h2>

      {/* Form Container */}
      <div className="w-full max-w-xl bg-white border border-blue-400 rounded-2xl p-8 shadow-sm">
        {/* Location */}
        <div className="mb-6">
          <label className="font-semibold text-gray-700 block mb-2">
            Enter your location
          </label>
          <input
            type="text"
            placeholder="Eg. village Bagrian, Attari, asr"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-full border border-gray-200 px-5 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Service */}
        <div className="mb-10">
          <label className="font-semibold text-gray-700 block mb-2">
            Selected service
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-full border border-gray-200 px-5 py-3 outline-none focus:border-blue-500"
          >
            <option>Eg. Plumber</option>
            <option>Electrician</option>
            <option>Cleaner</option>
            <option>Painter</option>
          </select>
        </div>

        {/* Next Button */}
        <button
          onClick={() => onNext({ location, service })}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full mx-auto transition"
        >
          Next <IoChevronForward size={18} />
        </button>
      </div>
    </div>
    </>
  );
};
const Nav = ()=>{
  return (
    <header className="w-full shadow-sm bg-white fixed top-0 left-0 z-50">
      <div className="flex w-full justify-evenly items-center ">
        <div className="flex items-center gap-3">
                  <img src={logo} alt="Logo" className="h-[50px]" />
                </div>
         <div className="flex gap-4 items-center my-auto bg-gray-200 w-[50%] rounded-full justify-between">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
          Step 1
        </button>
        <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-full text-sm font-medium">
          Step 2
        </button>
        <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-full text-sm font-medium">
          Step 3
        </button>
      </div>
      </div>
      </header>
  )
}
export default StepOne;
