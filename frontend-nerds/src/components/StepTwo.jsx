import { useEffect, useState } from "react";
import { useData } from "../Context/DataContext";
import Nav from "./Nav";
import { FaStar, FaRegStar } from "react-icons/fa";
import expertsData from "../data/expertsData.json"; // ✅ Import your JSON file

const StepTwo = ({ onNext, step, onBack }) => {
  const { setSelectedExpert, locationforfilter, serviceselect } = useData();
  const [experts, setExperts] = useState([]);

  // 🧠 Filter experts based on both location & service
  useEffect(() => {
    if (!locationforfilter && !serviceselect) {
      setExperts(expertsData);
      return;
    }

    const filtered = expertsData.filter((expert) => {
      const matchesCity = locationforfilter
        ? expert.city.toLowerCase().includes(locationforfilter.toLowerCase())
        : true;

      const matchesService = serviceselect
        ? expert.service.toLowerCase().includes(serviceselect.toLowerCase())
        : true;

      return matchesCity && matchesService;
    });

    setExperts(filtered);
  }, [locationforfilter, serviceselect]);

  // ⭐ Render stars dynamically
  const renderStars = (rating) => (
    <div className="flex justify-center gap-1">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? (
          <FaStar key={i} className="text-yellow-500" />
        ) : (
          <FaRegStar key={i} className="text-gray-400" />
        )
      )}
    </div>
  );

  // 🧠 Function to handle "Hire Me"
  const handleHire = (expert) => {
    setSelectedExpert({
      ...expert,
      _id: expert._id || Date.now().toString(),
      category: expert.service,
      description: "Skilled expert ready to assist you.",
    });
    onNext(); // ✅ Go to StepThree
  };

  return (
    <>
      <Nav step={step} />

      <div className="min-h-screen bg-[#F6FAFF] pt-28 px-4 sm:px-6 lg:px-12">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
          Expert Profiles
        </h2>

        {experts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No experts found for{" "}
            <span className="text-blue-600 font-semibold">
              {serviceselect || "any service"}
            </span>{" "}
            in{" "}
            <span className="text-blue-600 font-semibold">
              {locationforfilter || "your area"}
            </span>
            .
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {experts.map((ex, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-md border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <img
                  src={ex.img}
                  alt={ex.name}
                  className="w-28 h-28 rounded-full mx-auto mb-3 object-cover border-2 border-blue-400"
                />
                <h3 className="font-bold text-lg text-gray-800">{ex.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{ex.service}</p>
                {renderStars(ex.rating)}
                <div className="text-sm text-left mt-4 space-y-1 text-gray-700">
                  <p>
                    <b>📞 Contact:</b> {ex.phone}
                  </p>
                  <p>
                    <b>📍 City:</b> {ex.city}
                  </p>
                  <p>
                    <b>👥 Clients served:</b> {ex.clients}
                  </p>
                </div>

                {/* Hire Button */}
                <div className="flex gap-3 mt-6 justify-center">
                  <button
                    onClick={() => handleHire(ex)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
                  >
                    Hire Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🔙 Back Button */}
        <button
          onClick={onBack}
          className="mt-10 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mx-auto block"
        >
          ← Back
        </button>
      </div>
    </>
  );
};

export default StepTwo;
