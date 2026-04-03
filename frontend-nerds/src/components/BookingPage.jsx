import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const fetchBookings = async () => {
    const res = await axios.get(
      `http://localhost:3000/bookservice/mybookings/${storedUser._id}`
    );
    setBookings(res.data.bookings || []);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ Cancel Booking
  const cancelBooking = async (id) => {
    await axios.put(`http://localhost:3000/bookservice/cancel/${id}`);
    fetchBookings();
  };

  // ✅ Rebook
  const rebook = async (id) => {
    await axios.post(`http://localhost:3000/bookservice/rebook/${id}`);
    fetchBookings();
  };

  // ✅ Status Colors
  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // ✅ Filter Logic
  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.serviceType === filter);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>

      {/* 🔽 FILTER */}
      <div className="mb-6 flex justify-center">
        <select
          className="border p-2 rounded-lg"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Services</option>
          {[...new Set(bookings.map((b) => b.serviceType))].map(
            (service) => (
              <option key={service} value={service}>
                {service}
              </option>
            )
          )}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl shadow-md p-5"
          >
            <h3 className="text-lg font-semibold text-blue-600">
              {booking.serviceType}
            </h3>

            <p className="text-sm text-gray-500">
              {booking.expertId?.category}
            </p>

            <p className="font-medium mt-1">
              👨‍🔧 {booking.expertName}
            </p>

            <p className="text-sm mt-2 text-gray-600">
              {booking.description}
            </p>

            <div className="text-sm mt-3 space-y-1">
              <p>📅 {booking.date}</p>
              <p>⏰ {booking.time}</p>
              <p>📍 {booking.location}</p>
            </div>

            {/* STATUS */}
            <div className="flex justify-between items-center mt-4">
              <span
                className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>

              <span className="text-xs bg-green-100 px-2 py-1 rounded">
                {booking.payment}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-4">
              {booking.status !== "cancelled" && (
                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={() => rebook(booking._id)}
                className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
              >
                Rebook
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              {new Date(booking.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}