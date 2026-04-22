import { useEffect, useState } from "react";
import axios from "axios";
import { useData } from "../Context/DataContext";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar.jsx"
import { useSearchParams } from "react-router-dom";
import {
  FiCheck,
  FiX,
  FiCheckCircle,
  FiClock,
  FiPhone,
  FiUser,
  FiTool,
  FiCalendar,
  FiInbox,
  FiMapPin,
  FiMail
} from "react-icons/fi";

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending: { label: "Pending", card: "bg-blue-100 border-blue-300", badge: "bg-yellow-100 text-yellow-700 border border-yellow-300" },
  accepted: { label: "Accepted", card: "bg-emerald-50 border-emerald-200", badge: "bg-emerald-100 text-emerald-700 border border-emerald-300" },
  cancelled: { label: "Cancelled", card: "bg-red-50 border-red-200 opacity-60", badge: "bg-red-100 text-red-600 border border-red-300" },
  completed: { label: "Completed", card: "bg-slate-100 border-slate-200", badge: "bg-slate-200 text-slate-600 border border-slate-300" },
};

const getConfig = (status = "pending") =>
  STATUS_CONFIG[status.toLowerCase()] ?? STATUS_CONFIG.pending;

// ─── Single card ──────────────────────────────────────────────────────────────
function BookingCard({ booking, onUpdateStatus }) {
  const status = booking.status?.toLowerCase() ?? "pending";
  const config = getConfig(status);
  const [quote, setQuote] = useState("");
  const [message, setMessage] = useState("");

  const sendQuote = async () => {
    try {
      if (!quote) return alert("Enter amount");

      await axios.post(
        `http://localhost:3000/bookservice/quote/${booking._id}`,
        {
          amount: quote,
          message,
        }
      );

      alert("✅ Quote sent");
      window.location.reload(); // quick refresh
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send quote");
    }
  };

  const openWhatsApp = (phone, name, service) => {
    if (!phone) {
      alert("Phone number not available");
      return;
    }

    let formattedPhone = phone.replace(/\D/g, "");

    // 🇮🇳 India format
    if (formattedPhone.length === 10) {
      formattedPhone = "91" + formattedPhone;
    }

    const message = encodeURIComponent(
      `Hi ${name}, I'm your expert for ${service}. I'm reaching out regarding your booking.`
    );

    const url = `https://wa.me/${formattedPhone}?text=${message}`;

    window.open(url, "_blank");
  };

  const isPending = status === "pending";
const isAccepted = status === "accepted";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
      className={`relative rounded-2xl p-5 flex gap-4 items-start shadow-md border overflow-hidden transition-all duration-300 ${config.card}`}
    >
      {/* Decorative glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full  blur-2xl pointer-events-none" />

      {/* Avatar */}
      <div className="shrink-0">
        <div className="w-16 h-16 rounded-full ring-4 ring-white/60 shadow-lg bg-white/30 flex items-center justify-center overflow-hidden">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              booking.userId?.name ?? "U"
            )}&background=3b82f6&color=fff&size=128`}
            alt={booking.userId?.name ?? "User"}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        {/* Name + badge */}
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className="text-[16px] font-bold text-slate-800 tracking-wide leading-tight drop-shadow-sm">
            {booking.userId?.name ?? "Unknown User"}
          </h3>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${config.badge}`}>
            {getConfig(booking.status).label}
          </span>

        </div>

        {/* Meta rows */}
        <div className="mt-2 space-y-1">
          <Row icon={<FiPhone size={11} />} text={booking.mobile || "N/A"} />
          <Row icon={<FiTool size={11} />} text={booking.serviceType || "Not specified"} />
          <Row icon={<FiMapPin size={11} />} text={booking.location || "N/A"} />
          <Row icon={<FiCalendar size={11} />} text={new Date(booking.createdAt).toLocaleString()} />
        </div>

        {/* Action buttons */}
        <AnimatePresence>
          {(isPending || isAccepted) && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex flex-wrap gap-2 mt-3"
            >

              {status === "pending" && (
                <div className="mt-3 space-y-2 w-full">

                  <input
                    type="number"
                    placeholder="Enter price (₹)"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full border px-2 py-1 rounded text-sm"
                  />

                  <input
                    type="text"
                    placeholder="Message (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border px-2 py-1 rounded text-sm"
                  />

                  <button
                    onClick={sendQuote}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-semibold w-full"
                  >
                    Send Quote
                  </button>
                </div>
              )}
              {status === "quoted" && (
  <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
    <p>💰 Quote Sent: ₹{booking.quoteAmount}</p>
    <p className="text-gray-600 text-xs">
      Waiting for user response...
    </p>
  </div>
)}
              {isAccepted && (
                <ActionBtn
                  icon={<FiCheckCircle size={12} />}
                  label="Mark Complete"
                  color="bg-emerald-600 hover:bg-emerald-700 text-whtie"
                  onClick={() => onUpdateStatus(booking._id, "completed")}
                />
              )}
              <button
                onClick={() =>
                  openWhatsApp(
                    booking.mobile,
                    booking.userId?.name,
                    booking.serviceType
                  )
                }
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
              >
                {<FiPhone size={11} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Row({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-slate-500  shrink-0">{icon}</span>
      <p className="text-xs text-slate-500  truncate">{text}</p>
    </div>
  );
}

function ActionBtn({ icon, label, color, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold shadow transition-colors ${color}`}
    >
      {icon}
      {label}
    </motion.button>
  );
}

// ─── Filter tab ───────────────────────────────────────────────────────────────
const TABS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

function FilterTabs({ active, onChange }) {
  const [searchParams] = useSearchParams();
  const tabFromURL = searchParams.get("tab");
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {TABS.map((tab) => (
        <motion.button
          key={tab}
          whileTap={{ scale: 0.96 }}
          onClick={() => onChange(tab)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${active === tab
            ? "bg-blue-600 text-white border-blue-600 shadow"
            : "bg-white text-slate-500 border-slate-200 hover:border-blue-400 hover:text-blue-600"
            }`}
        >
          {tab}
        </motion.button>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const ExpertBookings = () => {
  const [searchParams] = useSearchParams();
  const tabFromURL = searchParams.get("tab");
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState(tabFromURL || "All");
  const [loading, setLoading] = useState(true);
  const { user } = useData();
  const expert = user;

  // Fetch bookings
  useEffect(() => {
    if (!expert?._id) return;
    setLoading(true);
    axios
      .get(`http://localhost:3000/bookservice/expert/${expert._id}`)
      .then((res) => { setBookings(res.data); console.log(res.data); })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [expert]);

  // Update status
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/bookservice/status/${id}`,
        { status }
      );
      setBookings((prev) => prev.map((b) => (b._id === id ? res.data : b)));
    } catch (err) {
      console.log(err);
    }
  };

  const filtered =
    filter === "All"
      ? bookings
      : bookings.filter(
        (b) => b.status?.toLowerCase() === filter.toLowerCase()
      );

  return (
    <>
      <Navbar />
      <div className="mt-18 min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 py-12 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center mb-8"
          >
            <h2
              className="text-3xl font-extrabold text-slate-800 tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              My Bookings
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage and respond to your service requests
            </p>
          </motion.div>

          {/* Filter tabs */}
          <FilterTabs active={filter} onChange={setFilter} />

          {/* States */}
          {loading ? (
            <div className="flex justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                className="w-8 h-8 rounded-full border-4 border-blue-400 border-t-transparent"
              />
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 py-24 text-slate-400"
            >
              <FiInbox size={44} strokeWidth={1.2} />
              <p className="text-sm font-medium">No bookings found</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {filtered.map((b) => (
                  <BookingCard
                    key={b._id}
                    booking={b}
                    onUpdateStatus={updateStatus}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpertBookings;