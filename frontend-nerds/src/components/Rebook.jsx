import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function Rebook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  // 🧾 Form state
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [mobile, setMobile] = useState("");
  const [payment, setPayment] = useState("");

  // 📦 Fetch booking
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`/bookservice/${id}`);
        const b = res.data.booking;

        setBooking(b);

        // ✅ Prefill
        setDate(b.date || "");
        setLocation(b.location || "");
        setMobile(b.mobile || "");
        setPayment(b.payment || "");
      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    };

    fetchBooking();
  }, [id]);

  if (!booking) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Loading...
      </div>
    );
  }

  const expert = booking.expertId;

  // ⭐ Stars
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

  // 🔁 Handle Rebook
  const handleRebook = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/bookservice/rebook/${id}`, {
        date,
        location,
        mobile,
        payment,
      });

      alert("✅ Rebooked successfully!");
      navigate("/mybookings");
    } catch (err) {
      console.error("Rebook error:", err);
      alert("❌ Failed to rebook");
    }
  };

  return (
    <>
      <Nav step={3} />

      <div className="min-h-screen bg-[#F6FAFF] pt-24 pb-10 px-4 sm:px-6 lg:px-20">
        {/* 🔷 Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Final Check-Out
        </h1>

        <div className="flex flex-col md:flex-row gap-10 justify-between items-start">
          
          {/* 🧑‍🔧 LEFT - Expert Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Selected Worker
            </h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={
                  expert?.profilePhoto ||
                  `https://ui-avatars.com/api/?name=${expert?.fullName}`
                }
                alt={booking.expertName}
                className="w-28 h-28 rounded-full mx-auto mb-3 object-cover border-2 border-blue-400"
              />

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-800">
                  {booking.expertName}
                </h3>

                <p className="text-blue-600 font-medium mb-2">
                  {booking.serviceType}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {booking.description || "No description"}
                </p>

                {renderStars(expert?.rating?.average || 4)}
              </div>
            </div>

            {/* OLD DATA */}
            <div className="mt-6 flex justify-around border-t border-gray-200 pt-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Old Date</p>
                <p className="text-lg font-semibold text-gray-800">
                  {booking.date}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Old Address</p>
                <p className="text-lg font-semibold text-gray-800">
                  {booking.location}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="mt-10 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mx-auto block"
            >
              ← Back
            </button>
          </div>

          {/* 📋 RIGHT - Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              User Info
            </h2>

            <form onSubmit={handleRebook} className="space-y-4">

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
                  placeholder="Eg. Village Bagrian, Attari"
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
                  placeholder="Eg. 9876543210"
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
                <input
                  type="text"
                  placeholder="UPI / Cash"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
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
                Confirm & Rebook Expert
              </button>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}