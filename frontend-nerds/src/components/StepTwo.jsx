import { useEffect, useState } from "react";
import { useData } from "../Context/DataContext";
import Nav from "./Nav";
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";

const StepTwo = ({ onNext, step, onBack }) => {
  const { setSelectedExpert } = useData(); // global setter

  const initialExperts = [
    {
      name: "Akinwumi Michael",
      service: "Plumber",
      phone: "9877423242",
      city: "Amritsar",
      clients: "50+",
      rating: 4,
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "John Carter",
      service: "Electrician",
      phone: "9988776655",
      city: "Amritsar",
      clients: "80+",
      rating: 5,
      img: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      name: "Ravi Singh",
      service: "Painter",
      phone: "9876543210",
      city: "Ludhiana",
      clients: "65+",
      rating: 4,
      img: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      name: "Priya Sharma",
      service: "Cleaner",
      phone: "9865321478",
      city: "Jalandhar",
      clients: "90+",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Rohit Mehra",
      service: "Carpenter",
      phone: "9854123678",
      city: "Chandigarh",
      clients: "70+",
      rating: 4,
      img: "https://randomuser.me/api/portraits/men/28.jpg",
    },
    {
      name: "Simran Kaur",
      service: "Electrician",
      phone: "9845789654",
      city: "Patiala",
      clients: "55+",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/61.jpg",
    },
    {
      name: "Arjun Verma",
      service: "Plumber",
      phone: "9812345678",
      city: "Amritsar",
      clients: "100+",
      rating: 5,
      img: "https://randomuser.me/api/portraits/men/47.jpg",
    },
    {
      name: "Manpreet Kaur",
      service: "Gardener",
      phone: "9877894321",
      city: "Ludhiana",
      clients: "40+",
      rating: 4,
      img: "https://randomuser.me/api/portraits/women/25.jpg",
    },
    {
      name: "Rakesh Kumar",
      service: "Mechanic",
      phone: "9898989898",
      city: "Amritsar",
      clients: "85+",
      rating: 5,
      img: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      name: "Anita Desai",
      service: "Painter",
      phone: "9823456712",
      city: "Pathankot",
      clients: "65+",
      rating: 4,
      img: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      name: "Vikram Bhatia",
      service: "AC Technician",
      phone: "9812341234",
      city: "Bathinda",
      clients: "75+",
      rating: 5,
      img: "https://randomuser.me/api/portraits/men/62.jpg",
    },
    {
      name: "Neha Kapoor",
      service: "Cleaner",
      phone: "9834512345",
      city: "Chandigarh",
      clients: "120+",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/40.jpg",
    },
  ];

  const [experts, setExperts] = useState(initialExperts);

  // ⭐ Renders the stars dynamically
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

  // useEffect(() => {
  //   axios.get("http://localhost:3000/experts").then((res) => {
  //     setExperts(res.data);
  //   });
  // }, []);

  // 🧠 Function to handle "Hire Me"
  const handleHire = (expert) => {
    setSelectedExpert({
      ...expert,
      _id: expert._id || Date.now().toString(), // temporary unique ID
      category: expert.service,
      description: "Skilled expert ready to assist you.", // optional
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

        {/* 🔹 Responsive Grid for Cards */}
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
