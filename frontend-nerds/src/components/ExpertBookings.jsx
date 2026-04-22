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
const isAccepted = status === "accepted" ;

   return (
  <div className="bg-[#f6f7fb] rounded-2xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.06)]">

    {/* HEADER */}
    <div className="flex justify-between items-center">

      <div className="flex items-center gap-3">
        <img
          src={`https://ui-avatars.com/api/?name=${booking.userId?.name}`}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-gray-800 text-[15px]">
            {booking.userId?.name}
          </h3>
          <p className="text-xs text-gray-400">
            M. {booking.mobile}
          </p>
        </div>
      </div>

      {/* STATUS */}
      <span className="text-[11px] px-3 py-1 rounded-full font-semibold bg-[#fde8dc] text-[#c2410c]">
       {booking.status}
      </span>
    </div>

    {/* SUMMARY */}
    <div className="mt-4 bg-[#eef2f7] rounded-xl p-4 text-sm text-gray-600">

      <p className="font-medium text-gray-700 mb-2 flex items-center gap-2">
        📄 Summary
      </p>

      <p className="flex items-center gap-2 text-gray-600">
        <FiMapPin size={14} />
        {booking.location}
      </p>

      <p className="flex items-center gap-2 text-gray-600 mt-1">
        <FiCalendar size={14} />
        {booking.date} {booking.time}
      </p>

      {booking.description && (
        <p className="text-xs text-gray-400 mt-2 border-t pt-2">
          {booking.description}
        </p>
        
      )}
        {status === "pending" && (
      <input
                    type="number"
                    placeholder="Enter price (₹)"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full text-xs text-gray-00 mt-2 border-t-b pt-2 outline-none"
                  />)
                  }
                  {status === "quoted"  && (
  <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
    <p>Service Fees : ₹{booking.quoteAmount}</p>
  </div>)}
  {(status === "completed" || status ==="accepted")  && (
  <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
    <p>Service Fees : ₹{booking.quoteAmount}</p>
     <p>Payment Recieved</p>
  </div>)}
    </div>

    {/* FOOTER */}
    <div className="flex justify-between items-center mt-5">

      {/* CHAT BUTTON */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-blue-600 bg-white text-sm hover:bg-gray-50 transition">
        <FiPhone size={14} />
        Chat
      </button>
      

      {/* RIGHT ACTIONS */}
      <div className="flex gap-3">

        

 {status === "quoted"  && (
 <button onClick={sendQuote} disabled
         className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gray-400 text-white text-sm font-medium shadow">
          Payment Pending 
        </button>)}
        {status === "pending" && (
  <div className="flex gap-3">
    <button onClick={() => onUpdateStatus(booking._id, "cancelled")}
 className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-200 text-red-500 text-sm font-medium shadow-inner">
      ✕ Reject
    </button>

    <button
      onClick={sendQuote}
      className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium shadow"
    >
      Send Quote
    </button>
  </div>
)}
{status === "accepted"  && (
 <button onClick={() => onUpdateStatus(booking._id, "completed")}
         className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium shadow">
          Mark Complete
        </button>)}
         {status === "completed"  && (
 <button onClick={sendQuote} disabled
         className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gray-400 text-white text-sm font-medium shadow">
          Service completed
        </button>)}




      </div>
    </div>

  </div>
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
const TABS = ["All", "Pending", "Accepted", "Completed", "Cancelled"];

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
    return (
  <>
    <Navbar />

    <div className="mt-20 min-h-screen bg-[#f3f5f9] px-6 py-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            My Bookings
          </h1>
          <p className="text-sm text-gray-500">
            Manage and track your service requests and appointments.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-12 gap-6">

          {/* SIDEBAR */}
          <div className="col-span-3 space-y-5">

            {/* FILTER */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border">
              <h3 className="text-sm font-semibold mb-3">Status Filter</h3>

              {["All", "Pending", "Accepted", "Completed"].map((tab) => (
                <div
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
                    filter === tab ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-4 h-4 border rounded-full flex items-center justify-center">
                    {filter === tab && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                  </div>
                  <span className="text-sm">{tab}</span>
                </div>
              ))}
            </div>

            {/* STATS */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-5">
              <h2 className="text-3xl font-bold">{filtered.length}</h2>
              <p className="text-sm">Active Requests</p>
            </div>

          </div>

          {/* BOOKINGS LIST */}
          <div className="col-span-9 space-y-5">

            {loading ? (
              <p>Loading...</p>
            ) : filtered.length === 0 ? (
              <p>No bookings</p>
            ) : (
              filtered.map((b) => (
                <BookingCard
                  key={b._id}
                  booking={b}
                  onUpdateStatus={updateStatus}
                />
              ))
            )}

          </div>
        </div>
      </div>
    </div>
  </>
);
    </>
  );
};

export default ExpertBookings;