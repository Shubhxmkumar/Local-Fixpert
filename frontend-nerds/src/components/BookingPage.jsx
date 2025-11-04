import { useEffect, useState } from "react";
import api from "./frontend-nerds/src/api/axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookservice/mybookings");
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading your bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">My Bookings</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              {booking.service?.name || "Service"}
            </h3>
            <p>
              <strong>Date:</strong> {booking.date}
            </p>
            <p>
              <strong>Time:</strong> {booking.time}
            </p>
            <p>
              <strong>Address:</strong> {booking.address}
            </p>
            <p>
              <strong>Price:</strong> ₹{booking.price}
            </p>
            <p className="mt-2">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  booking.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : booking.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {booking.status}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Booked on {new Date(booking.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
