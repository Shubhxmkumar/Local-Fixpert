import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import logo from "../assets/logo.png";
import { useData } from "../Context/DataContext";
import Nav from "./Nav";

/* --------------------------- STEP FORM COMPONENT --------------------------- */
const StepForm = ({ step, title, description, onNext }) => {
  const { data,setlocationforfilter } = useData(); // ✅ Access global data
  const [location, setLocation] = useState("");
  const [service, setService] = useState(data?.title || "");
   
  const services = [
    "Plumbing",
    "Electrician",
    "House Cleaning",
    "AC Servicing",
    "Carpenter",
    "Mover",
    "Wall Painter",
  ];

  const handleNext = () => {
    if (!location.trim() || !service) {
      alert("Please fill in all fields before continuing.");
      return;
    }
    onNext({ location, service });
    setlocationforfilter(location);
  };

  return (
    <>
      {/* Navbar */}
      <Nav step={step} />

      {/* Page Layout */}
      <main className="min-h-screen bg-[#F6FAFF] flex flex-col items-center pt-36 sm:pt-32 px-4 sm:px-6">
        {/* Step Header */}
        <header className="text-center mb-8">
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            {title}
          </h2>
        </header>

        {/* Form Card */}
        <section className="w-full max-w-md sm:max-w-xl bg-white border border-blue-400 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Location Input */}
          <div className="mb-6">
            <label
              htmlFor="location"
              className="font-semibold text-gray-700 block mb-2 text-sm sm:text-base"
            >
              Enter your location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Eg. village Bagrian, Attari, asr"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-full border border-gray-200 px-4 sm:px-5 py-2.5 sm:py-3 outline-none focus:border-blue-500 text-sm sm:text-base"
            />
          </div>

          {/* Service Select */}
          <div className="mb-8">
            <label
              htmlFor="service"
              className="font-semibold text-gray-700 block mb-2 text-sm sm:text-base"
            >
              Select a service
            </label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full rounded-full border border-gray-200 px-4 sm:px-5 py-2.5 sm:py-3 outline-none focus:border-blue-500 text-sm sm:text-base"
            >
              <option value="">Choose a service</option>
              {services.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Next Button */}
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 justify-center text-sm sm:text-base px-6 sm:px-8 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md"
            >
              Next <IoChevronForward size={18} />
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

/* --------------------------- INDIVIDUAL STEPS --------------------------- */
export const StepOne = ({ onNext }) => (
  <StepForm
    step={1}
    title="Describe your task"
    description="Please tell us what kind of help you need"
    onNext={onNext}
  />
);

export const StepTwo = ({ onNext }) => (
  <StepForm
    step={2}
    title="Confirm your details"
    description="Review your task information before continuing"
    onNext={onNext}
  />
);

export const StepThree = ({ onNext }) => (
  <StepForm
    step={3}
    title="Finalize your request"
    description="Almost done! Please confirm and submit your request."
    onNext={onNext}
  />
);

/* --------------------------- DEFAULT EXPORT --------------------------- */
export default StepOne;