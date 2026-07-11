import { useEffect, useState } from "react";
import { useData } from "../Context/DataContext";
import Nav from "./Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";


const StepTwo = ({ onNext, step, onBack }) => {
  const { setSelectedExpert, locationforfilter, serviceselect,url } = useData();

  // ✅ ALL state inside component
  const [experts, setExperts] = useState([]);
  const [allExperts, setAllExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // ✅ Fetch experts
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await axios.get(`${url}/expert/experts`);
        setAllExperts(res.data);
        setExperts(res.data);
      } catch (err) {
        console.error("Error fetching experts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  // ✅ Filter logic (FIXED)
  useEffect(() => {
    let filtered = allExperts;

    if (locationforfilter) {
      filtered = filtered.filter((expert) =>
        expert.serviceArea
          ?.toLowerCase()
          .includes(locationforfilter.toLowerCase())
      );
    }

    if (serviceselect) {
      filtered = filtered.filter((expert) =>
        expert.category
          ?.toLowerCase()
          .includes(serviceselect.toLowerCase())
      );
    }

    setExperts(filtered);
  }, [locationforfilter, serviceselect, allExperts]);

  // ⭐ Stars
  const renderStars = (rating = 0) => (
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

  // ✅ Hire
  const handleHire = (expert) => {
    setSelectedExpert({
      ...expert,
      category: expert.category,
      description: "Skilled expert ready to assist you.",
    });
    onNext();
  };

  return (
    <>
      <Nav step={step} />

      <div className="min-h-screen bg-[#F6FAFF] pt-28 px-4 sm:px-6 lg:px-12">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
          Expert Profiles
        </h2>

        {/* ✅ Optional loading */}
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : experts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No experts found for{" "}
            <span className="text-blue-600 font-semibold">
              {serviceselect || "any service"}
            </span>{" "}
            in{" "}
            <span className="text-blue-600 font-semibold">
              {locationforfilter || "your area"}
            </span>
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {experts.map((ex, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-md border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <img
                  src={
                    ex.profilePhoto ||
                    `https://ui-avatars.com/api/?name=${ex.fullName}`
                  }
                  alt={ex.fullName}
                  className="w-28 h-28 rounded-full mx-auto mb-3 object-cover border-2 border-blue-400"
                />

                {/* ✅ FIXED fields */}
                <h3 className="font-bold text-lg text-gray-800">
                  {ex.fullName}
                </h3>

                <p className="text-blue-600 font-medium mb-2">
                  {ex.category}
                </p>
                


                {renderStars(ex.rating.average.toFixed(1))}

                <div className="text-sm text-left mt-4 space-y-1 text-gray-700">
                  <p><b>Expert ID:</b> {ex.expertID}</p>
                  <p><b>📞 Contact:</b> {ex.mobile}</p>
                  <p><b>📍 City:</b> {ex.serviceArea}</p>
                  <p><b>👥 Clients served:</b> {ex.clients || 0}</p>
                  <p
  className={`text-sm font-semibold mt-2 ${
    ex.isAvailable ? "text-green-600" : "text-red-500"
  }`}
>
  {ex.isAvailable ? "🟢 Available" : "🔴 Not Available"}
</p>
                </div>

                <div className="flex gap-3 mt-6 justify-center">
                  <button
  onClick={() => handleHire(ex)}
  disabled={!ex.isAvailable}
  className={`px-5 py-2 rounded-full text-white transition ${
    ex.isAvailable
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  {ex.isAvailable ? "Hire Me" : "Unavailable"}
</button> <button
                    onClick={() => navigate(`/expert/reviews/${ex._id}`)}
                    className="text-blue-500 text-sm underline"
                  >
                    View Reviews
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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