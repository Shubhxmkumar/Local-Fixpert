import { useEffect, useState } from "react";
import { useData } from "../Context/DataContext";
import Nav from "./Nav";
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";

const experts = [
  {
    name: "AKINWUMI MICHAEL",
    service: "Plumber",
    phone: "9877423242",
    city: "Amritsar",
    clients: "50+",
    rating: 4,
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "John Carter",
    service: "Electrician",
    phone: "9988776655",
    city: "Amritsar",
    clients: "80+",
    rating: 5, 
    img: "https://randomuser.me/api/portraits/men/55.jpg"
  }
];

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
          className="mt-10 text-blue-600 underline block mx-auto hover:text-blue-800 transition"
        >
          ← Back
        </button>
      </div>
    </>
  );
};

export default StepTwo;
