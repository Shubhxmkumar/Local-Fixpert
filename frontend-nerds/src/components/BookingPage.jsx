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
  const { user,url } = useData();
  const [ratingModal, setRatingModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const [paymentModal, setPaymentModal] = useState(null);
  const [method, setMethod] = useState("card");
 
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [upi, setUpi] = useState("");
  const [bank, setBank] = useState("");
  const [payLoading, setPayLoading] = useState(false);

  const fetchBookings = async () => {
    if (!user?._id) return;

    const res = await axios.get(
      `${url}/bookservice/mybookings/${user._id}`,
    );
    setBookings(res.data.bookings || []);
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  // ❌ Cancel
  const cancelBooking = async (id) => {
    await axios.put(`${url}/bookservice/cancel/${id}`);
    fetchBookings();
  };

  // 🔁 Rebook
  const rebook = async (id) => {
    await axios.post(`${url}/bookservice/rebook/${id}`);
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
  // const acceptQuote = async (id) => {
  //   try {
  //     // 1️⃣ Accept quote (backend calculates ₹100 fee)
  //     const res = await axios.post(
  //       `http://localhost:3000/bookservice/accept/${id}`
  //     );

  //     const booking = res.data.booking;

  //     // 2️⃣ Create order
  //     const { data } = await axios.post(
  //       `http://localhost:3000/bookservice/create-order/${id}`
  //     );

  //     // 3️⃣ Razorpay
  //     const options = {
  //       key: "YOUR_RAZORPAY_KEY",
  //       amount: data.order.amount,
  //       currency: "INR",
  //       name: "Local Fixperts",
  //       description: "Service Payment",
  //       order_id: data.order.id,

  //       handler: async function (response) {
  //         await axios.post(
  //           "http://localhost:3000/bookservice/verify-payment",
  //           {
  //             bookingId: id,
  //             paymentId: response.razorpay_payment_id,
  //           }
  //         );

  //         alert("✅ Payment Successful!");
  //         fetchBookings();
  //       },

  //       theme: { color: "#2563eb" },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();

  //   } catch (err) {
  //     console.error(err);
  //     alert("❌ Error in payment");
  //   }
  // };
  const acceptQuote = async (id) => {
    try {
      // 1️⃣ Accept quote
      await axios.post(`${url}/bookservice/accept/${id}`);

      //  (simulate payment gateway)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 3️⃣ Mark as paid
      await axios.post(
        `${url}/bookservice/verify-payment`,
        {
          bookingId: id,
          paymentId: "PAY_" + Date.now(),
        }
      );

      alert("✅ Payment Successful");
      fetchBookings();

    } catch (err) {
      console.error(err);
      alert("❌ Payment failed");
    }
  };
  const rejectQuote = async (id) => {
    await axios.post(
      `${url}/bookservice/reject/${id}`
    );
    fetchBookings();
  };
  // ✅ Luhn Algorithm (real card validation)
  const isValidCardNumber = (num) => {
    const cleaned = num.replace(/\s+/g, "");
    if (!/^\d{12,19}$/.test(cleaned)) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  // ✅ Expiry validation
  const isValidExpiry = (exp) => {
    if (!/^\d{2}\/\d{2}$/.test(exp)) return false;

    const [mm, yy] = exp.split("/").map(Number);
    if (mm < 1 || mm > 12) return false;

    const now = new Date();
    const year = 2000 + yy;
    const expiryDate = new Date(year, mm);

    return expiryDate > now;
  };

  // ✅ UPI validation
  const isValidUPI = (upi) => /^[\w.-]+@[\w]+$/.test(upi);

  const renderPrimaryCTA = (booking) => {
  const base =
    "px-6 py-2.5 text-sm rounded-xl font-medium flex items-center gap-2 shadow-sm transition";

  switch (booking.status) {
    case "pending":
      return (
        <button
          disabled
          className={`${base} bg-gray-300 text-gray-500 cursor-not-allowed px-12`}
        >
           Pay
        </button>
      );
      case "accepted":
      return (
        <button
          disabled
          className={`${base} bg-gray-300 text-gray-500 cursor-not-allowed`}
        >
           Payment Completed
        </button>
      );
    case "quoted":
      return (
        <button
          onClick={() => setPaymentModal(booking)}
          className={`${base} bg-blue-600 hover:bg-blue-700 text-white px-12`}
        >
          Pay
        </button>
      );

    case "completed":
      return booking.isRated ? (
        <span className="text-sm text-yellow-500 font-medium">
          Rated ⭐
        </span>
      ) : (
        <button
          onClick={() => setRatingModal(booking)}
          className={`${base} bg-yellow-700 px-12 hover:bg-yellow-500 text-white `}
        >
         Rate
        </button>
      );

    default:
      return null;
  }
};


  return (
    <div className="max-w-5xl mx-auto mt-24 px-4 ">
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
      <div className="grid gap-5">
        {filteredBookings.map((booking) => (
          
          <motion.div
  key={booking._id}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
>
  {/* HEADER */}
  <div className="flex justify-between items-start">
    
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
        <img
                  src={
                    `https://ui-avatars.com/api/?name=${booking.expertName}`
                  }
                  alt={booking.expertName}
                  className=" rounded-full mx-auto  object-cover border-2 border-blue-400"
                />
        </div>

      <div>
        <h3 className="font-semibold text-gray-800 text-lg">
          {booking.expertName}
        </h3>

        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
          <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
            {booking.expertId?.category?.toUpperCase()}
          </span>

          <span className="flex items-center gap-1">
            <FiMapPin size={12} />
            {booking.location}
          </span>
        </div>
      </div>
    </div>

    {/* STATUS */}
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
        booking.status === "quoted"
          ? "bg-orange-100 text-orange-600"
          : booking.status === "pending"
          ? "bg-blue-100 text-blue-600"
          : booking.status === "completed"
          ? "bg-gray-200 text-gray-600"
          : "bg-red-100 text-red-500"
      }`}
    >
      {booking.status}
    </span>
  </div>

  {/* DATE */}
  <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
      <span className="text-blue-500">

    <FiCalendar size={14}/> </span>
    {booking.date} • {booking.time}
  </div>

  {/* CONTENT BLOCK */}
  <div className="mt-4">
    {(booking.status === "quoted" || booking.status === "accepted" || booking.status === "completed" )? (
      <div className="bg-gray-100 border border-gray-200 rounded-xl p-4">
        <p className="text-xs text-gray-400 mb-2 uppercase font-medium">
          Quote Summary
        </p>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Service Price</span>
          <span>₹{booking.quoteAmount}</span>
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
                    className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
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
                      `${url}/bookservice/rate/${ratingModal._id}`,
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
