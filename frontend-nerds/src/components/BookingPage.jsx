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
      await axios.post(`http://localhost:3000/bookservice/accept/${id}`);

      // 2️⃣ Fake delay (simulate payment gateway)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 3️⃣ Mark as paid
      await axios.post(
        "http://localhost:3000/bookservice/verify-payment",
        {
          bookingId: id,
          paymentId: "FAKE_PAY_" + Date.now(),
        }
      );

      alert("✅ Payment Successful (Fake)");
      fetchBookings();

    } catch (err) {
      console.error(err);
      alert("❌ Payment failed");
    }
  };
  const rejectQuote = async (id) => {
    await axios.post(
      `http://localhost:3000/bookservice/reject/${id}`
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
              {booking.paymentStatus === "paid" && (
                <span className="text-xs bg-green-200 px-2 py-1 rounded">
                  Paid ✅
                </span>
              )}
            </div>
            {booking.status === "quoted" && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
                <p>💰 Service Price: ₹{booking.quoteAmount}</p>
                <p>🏢 Platform Fee: ₹100</p>
                <p className="font-semibold">
                  Total Payable: ₹
                  {(booking.quoteAmount || 0) + (booking.platformFee || 100)}
                </p>

                {booking.quoteMessage && (
                  <p className="text-gray-600 mt-1">
                    💬 {booking.quoteMessage}
                  </p>
                )}

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setPaymentModal(booking)}
                    className="bg-green-500 text-white px-3 py-1 rounded-full text-xs"
                  >
                    Accept & Pay
                  </button>

                  <button
                    onClick={() => rejectQuote(booking._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-full text-xs"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
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
        {paymentModal && (

          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white/95 p-6 rounded-2xl w-96 shadow-lg">

              <h3 className="text-lg font-bold mb-2 text-center">
                💳 Payment
              </h3>



              {(() => {
                const service = paymentModal?.quoteAmount || 0;
                const fee = paymentModal?.platformFee || 100;
                const total = service + fee;

                return (
                  <div className="text-center text-sm mb-3">

                    <p className="">Amount: ₹{total}</p>
                  </div>
                );
              })()}

              {/* 🔘 METHOD SELECT */}
              <div className="flex justify-between mb-4">
                {["card", "upi", "Cash"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`px-3 py-1 rounded-full text-xs ${method === m
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* 💳 CARD */}
              {method === "card" && (
                <>
                  <input
                    placeholder="Card Number"
                    className="my-2 w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={card.number}
                    onChange={(e) =>
                      setCard({ ...card, number: e.target.value })
                    }
                  />

                  <input
                    placeholder="Card Holder Name"
                    className="my-2 w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={card.name}
                    onChange={(e) =>
                      setCard({ ...card, name: e.target.value })
                    }
                  />

                  <div className="flex gap-2">
                    <input
                      placeholder="MM/YY"
                      className="w-1/2 my-2 border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={card.expiry}
                      onChange={(e) =>
                        setCard({ ...card, expiry: e.target.value })
                      }
                    />

                    <input
                      placeholder="CVV"
                      type="password"
                      className="w-1/2 my-2 border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={card.cvv}
                      onChange={(e) =>
                        setCard({ ...card, cvv: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              {/* 📱 UPI */}
              {method === "upi" && (
                <input
                  placeholder="Enter UPI ID (name@upi)"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={upi}
                  onChange={(e) => setUpi(e.target.value)}
                />
              )}

              {/* 🏦 NET BANKING */}
              {method === "netbanking" && (
                <select
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                >
                  <option value="">Select Bank</option>
                  <option>HDFC</option>
                  <option>SBI</option>
                  <option>ICICI</option>
                </select>
              )}

              {/* 🔘 BUTTONS */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setPaymentModal(null)}
                  className="bg-gray-500 hover:bg-blue-700 flex-1 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    try {
                      setPayLoading(true);

                      // ✅ VALIDATION
                      if (method === "card") {
                        if (!isValidCardNumber(card.number))
                          return alert("Invalid card number");
                        if (!card.name)
                          return alert("Enter card holder name");
                        if (!isValidExpiry(card.expiry))
                          return alert("Invalid expiry");
                        if (!/^\d{3,4}$/.test(card.cvv))
                          return alert("Invalid CVV");
                      }

                      if (method === "upi") {
                        if (!isValidUPI(upi))
                          return alert("Invalid UPI ID");
                      }

                      if (method === "netbanking") {
                        if (!bank)
                          return alert("Select a bank");
                      }

                      // 1️⃣ Accept booking
                      await axios.post(
                        `http://localhost:3000/bookservice/accept/${paymentModal._id}`
                      );

                      // 2️⃣ Fake delay
                      await new Promise((r) => setTimeout(r, 1500));

                      // 3️⃣ Verify payment
                      await axios.post(
                        "http://localhost:3000/bookservice/verify-payment",
                        {
                          bookingId: paymentModal._id,
                          paymentId:
                            "FAKE_" + method + "_" + Date.now(),
                        }
                      );

                      alert("✅ Payment Successful");

                      setPaymentModal(null);
                      setCard({ number: "", name: "", expiry: "", cvv: "" });
                      setUpi("");
                      setBank("");

                      fetchBookings();

                    } catch (err) {
                      console.error(err);
                      alert("❌ Payment failed");
                    } finally {
                      setPayLoading(false);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 flex-1 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  {payLoading ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
