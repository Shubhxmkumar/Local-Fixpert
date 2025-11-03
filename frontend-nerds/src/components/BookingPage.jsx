import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all services
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await axios.get("http://localhost:3000/services", {
          withCredentials: true,
        });
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    }
    fetchServices();
  }, []);

  // Fetch user's bookings
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await axios.get("http://localhost:3000/bookings", {
          withCredentials: true,
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    }
    fetchBookings();
  }, []);

  // Handle booking submit
  async function handleBooking(e) {
    e.preventDefault();
    if (!selectedService || !date) {
      setMessage("Please select a service and date.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const service = services.find((s) => s._id === selectedService);
      await axios.post(
        "http://localhost:3000/bookings",
        {
          service: service._id,
          provider: service.provider._id,
          date,
          totalPrice: service.price,
        },
        { withCredentials: true }
      );
      setMessage("✅ Booking successful!");
      setSelectedService("");
      setDate("");

      // Refresh bookings
      const res = await axios.get("http://localhost:3000/bookings", {
        withCredentials: true,
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error creating booking:", err);
      setMessage("❌ Failed to book. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Book a Service</h1>

      <form
        onSubmit={handleBooking}
        className="border p-4 rounded-xl shadow-md bg-white"
      >
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Select Service:</label>
          <select
            className="border p-2 rounded w-full"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">-- Choose a service --</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.title} - ₹{s.price}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Choose Date:</label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          {loading ? "Booking..." : "Book Now"}
        </button>

        {message && (
          <p className="text-center mt-3 text-sm text-gray-700">{message}</p>
        )}
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Your Bookings
        </h2>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings yet.</p>
        ) : (
          <div className="grid gap-3">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="border p-3 rounded-lg shadow-sm bg-gray-50"
              >
                <p className="font-semibold">{b.service?.title || "Service"}</p>
                <p>Date: {new Date(b.date).toLocaleDateString()}</p>
                <p>Status: {b.status}</p>
                <p>Payment: {b.paymentStatus}</p>
                <p>Total: ₹{b.totalPrice}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
