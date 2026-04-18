import { useEffect, useState } from "react";
import axios from "axios";
import { useData } from "../Context/DataContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiTool,
  FiRefreshCw,
  FiX,
} from "react-icons/fi";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const { user } = useData();
  const [ratingModal, setRatingModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const navigate = useNavigate();


  const fetchBookings = async () => {
    if (!user?._id) return;

    const res = await axios.get(
      `http://localhost:3000/bookservice/mybookings/${user._id}`,
    );
    setBookings(res.data.bookings || []);
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  // ❌ Cancel
  const cancelBooking = async (id) => {
    await axios.put(`http://localhost:3000/bookservice/cancel/${id}`);
    fetchBookings();
  };

  // 🔁 Rebook
  const rebook = async (id) => {
    await axios.post(`http://localhost:3000/bookservice/rebook/${id}`);
    fetchBookings();
  };

  // 📊 Status UI (same pattern as expert)
  const STATUS = {
    pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    confirmed: "bg-emerald-100 text-emerald-700 border border-emerald-300",
    completed: "bg-slate-200 text-slate-600 border border-slate-300",
    cancelled: "bg-red-100 text-red-600 border border-red-300 opacity-70",
  };

  const getStatusStyle = (status) =>
    STATUS[status?.toLowerCase()] || STATUS.pending;

  // 🔍 Filter
  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.serviceType === filter);

  // 📲 WhatsApp
  const openWhatsApp = (phone, name, service) => {
    console.log(phone, name, service);
    if (!phone) return alert("No phone number");

    let formatted = phone.replace(/\D/g, "");
    if (formatted.length === 10) formatted = "91" + formatted;

    const msg = encodeURIComponent(
      `Hi ${name}, regarding my booking for ${service}`,
    );

    window.open(`https://wa.me/${formatted}?text=${msg}`, "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 px-4">
      <h2 className="text-3xl font-extrabold text-center mb-6">My Bookings</h2>

      {/* 🔽 FILTER */}
      <div className="flex justify-center mb-8">
        <select
          className="border px-4 py-2 rounded-full shadow-sm"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Services</option>
          {[...new Set(bookings.map((b) => b.serviceType))].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* 🧾 CARDS */}
      <div className="grid sm:grid-cols-2 gap-5">
        {filteredBookings.map((booking) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-5 shadow-md border bg-white hover:shadow-lg transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg text-blue-600">
                {booking.serviceType}
              </h3>

              <span
                className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(
                  booking.status,
                )}`}
              >
                {booking.status}
              </span>
            </div>

            {/* DETAILS */}
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p className="flex items-center gap-1">👨‍🔧 {booking.expertName}</p>
              <p className="flex items-center gap-1">
                <FiTool size={13} /> {booking.expertId?.category}
              </p>
              <p className="flex items-center gap-1">
                <FiMapPin size={13} /> {booking.location}
              </p>
              <p className="flex items-center gap-1">
                <FiCalendar size={13} /> {booking.date} • {booking.time}
              </p>
            </div>

            {/* DESC */}
            {booking.description && (
              <p className="text-xs text-gray-500 mt-2">
                {booking.description}
              </p>
            )}

            {/* PAYMENT */}
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs bg-green-100 px-2 py-1 rounded">
                {booking.payment}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(booking.createdAt).toLocaleString()}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {booking.status !== "cancelled" && (
                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full text-xs hover:bg-red-600"
                >
                  <FiX size={12} /> Cancel
                </button>
              )}

              <button
               onClick={() => navigate(`/rebook/${booking._id}`)}
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600"
              >
                <FiRefreshCw size={12} /> Rebook
              </button>

              <button
                onClick={() =>
                  openWhatsApp(
                    booking.expertId?.mobile,
                    booking.expertName,
                    booking.serviceType,
                  )
                }
                className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs hover:bg-green-600"
              >
                <FiPhone size={12} /> Chat
              </button>

              {booking.status === "completed" && !booking.isRated && (
                <button
                  onClick={() => setRatingModal(booking)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs"
                >
                  ⭐ Rate
                </button>
              )}
              {booking.isRated && (
                <div className="text-yellow-500 text-sm mt-2">
                  {booking.isRated && (
                    <span className="text-yellow-500 text-sm font-medium">
                      Rated ⭐
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {ratingModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl w-80 shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-center">
                Rate {ratingModal.expertName}
              </h3>

              {/* ⭐ Stars */}
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer text-2xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* ✍️ Review */}
              <textarea
                placeholder="Write a review (optional)"
                className="w-full border rounded-lg p-2 text-sm"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setRatingModal(null)}
                  className="flex-1 bg-gray-200 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    await axios.post(
                      `http://localhost:3000/bookservice/rate/${ratingModal._id}`,
                      { rating, review },
                    );

                    setRatingModal(null);
                    setRating(0);
                    setReview("");
                    fetchBookings();
                  }}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
