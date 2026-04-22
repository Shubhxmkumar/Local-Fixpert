import { useState } from "react";
import axios from "axios"; // ✅ added
import { useData } from "../Context/DataContext";
import Nav from "./Nav";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StepThree = ({ step, onBack }) => {
  const navigate = useNavigate();
  const { selectedExpert } = useData();

  // 🧾 Form state
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [mobile, setMobile] = useState("");
  const [payment, setPayment] = useState("");
  
  const [serviceType, setServiceType] = useState(
    selectedExpert?.category || selectedExpert?.service || ""
  );
  const [description, setDescription] = useState(
    selectedExpert?.description || "No description"
  );

  const time = new Date().toLocaleTimeString();

  // 🧱 Guard against no selected expert
  if (!selectedExpert)
    return (
      <div className="text-center mt-20 text-gray-600">
        <p>No expert selected. Please go back and choose one.</p>
        <button
          onClick={onBack}
          className="text-blue-600 underline mt-3 hover:text-blue-800 transition"
        >
          ← Back
        </button>
      </div>
    );

  // 📅 Handle booking form submit (✅ FIXED ONLY THIS)
  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      // 🔒 Validation
      if (!storedUser?._id) {
        alert("User not logged in");
        return;
      }

      if (!selectedExpert?._id) {
        alert("No expert selected");
        return;
      }

      if (!date || !location || !mobile || !payment) {
        alert("Please fill all required fields");
        return;
      }

      const bookingData = {
        userId: storedUser._id,
        expertId: selectedExpert._id,
        expertName: selectedExpert.fullName, // ✅ fixed
        serviceType, // ✅ correct field
        description,
        date,
        time,
        location,
        mobile,
        payment,
      };

      console.log("📤 Booking data being sent:", bookingData);

      const response = await axios.post(
        "http://localhost:3000/bookservice",
        bookingData
      );

      console.log("✅ Booking response:", response.data);

      alert("✅ Booking created successfully!");
      navigate("/mybookings");
      // 🔄 Reset form (optional)
      setDate("");
      setLocation("");
      setMobile("");
      setPayment("");

    } catch (error) {
      console.error("❌ Booking error:", error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
        "❌ Failed to create booking. Check console."
      );
    }
  };

  // ⭐ Render star ratings
  const renderStars = (rating) => (
    <div className="flex gap-1 mt-1 justify-center md:justify-start">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      )}
    </div>
  );

  return (
    <>
      <Nav step={step} />

      <div className="min-h-screen bg-[#F6FAFF] pt-24 pb-10 px-4 sm:px-6 lg:px-20">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Final Check-Out
        </h1>

        <div className="flex flex-col md:flex-row gap-10 justify-between items-start">
          {/* 🧑‍🔧 Selected Worker Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Selected Worker
            </h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={
                  selectedExpert.profilePhoto ||
                  `https://ui-avatars.com/api/?name=${selectedExpert.fullName}`
                }
                alt={selectedExpert.fullName}
                className="w-28 h-28 rounded-full mx-auto mb-3 object-cover border-2 border-blue-400"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedExpert.fullName}
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  {selectedExpert.category}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedExpert.description}
                </p>
                {renderStars(selectedExpert.rating.average)}
              </div>
            </div>

            <div className="mt-6 flex justify-around border-t border-gray-200 pt-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Experience</p>
                <p className="text-lg font-semibold text-gray-800">
                  {selectedExpert.experience || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Price</p>
                <p className="text-lg font-semibold text-gray-800">
                  ₹{selectedExpert.price || "300"}/hour
                </p>
              </div>
            </div>

            <button
              onClick={onBack}
              className="mt-10 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mx-auto block"
            >
              ← Back
            </button>
          </div>

          {/* 📋 User Info Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              User Info
            </h2>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Exact Location
                </label>
                <input
                  type="text"
                  placeholder="Eg. Village Bagrian, Attari, ASR"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  placeholder="Eg. 9323423423"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Payment Method
                </label>
                <select
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="" >Select Payment</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                </select>
              </div>

              <div className="flex items-start gap-2 mt-4">
                <input type="checkbox" required className="mt-1" />
                <p className="text-sm text-gray-700">
                  I confirm that the information provided is correct.
                </p>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
              >
                Confirm & Book Expert
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepThree;