import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useData } from "../Context/DataContext";
import {
  CheckCircle, Clock, Pencil, Star, LogOut,
  Bell, ChevronRight, MapPin, Calendar, Briefcase,
  TrendingUp, X, AlertCircle, Wifi, WifiOff,
} from "lucide-react";

const BASE = "http://localhost:3000";

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "—";

const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

// ─── AVATAR ──────────────────────────────────────────────────────────────────
const Avatar = ({ name, photo, size = 80, className = "" }) => {
  const sizeClass = {
    36: "w-9 h-9 text-sm",
    48: "w-12 h-12 text-sm",
    76: "w-19 h-19 text-xl",
    80: "w-20 h-20 text-xl",
    120: "w-30 h-30 text-2xl",
  }[size] ?? "w-20 h-20 text-xl";

  if (photo)
    return (
      <img
        src={photo}
        alt={name}
        style={{ width: size, height: size }}
        className={`rounded-full object-cover border-2 border-blue-400 flex-shrink-0 ${className}`}
      />
    );
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.32 }}
      className={`rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-blue-700 to-blue-400 border-2 border-blue-200 shadow-lg flex-shrink-0 ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

// ─── TOAST SYSTEM ─────────────────────────────────────────────────────────────
let _toastId = 0;

const Toast = ({ toasts, remove }) => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium shadow-xl min-w-64 max-w-sm animate-slide-up border
          ${t.type === "success" ? "bg-green-50 border-green-300 text-green-800"
          : t.type === "error" ? "bg-red-50 border-red-300 text-red-800"
          : "bg-blue-50 border-blue-200 text-blue-800"}`}
      >
        {t.type === "success" ? <CheckCircle size={16} />
          : t.type === "error" ? <AlertCircle size={16} />
          : <Bell size={16} />}
        <span className="flex-1">{t.message}</span>
        <button onClick={() => remove(t.id)} className="cursor-pointer bg-transparent border-none p-0 leading-none text-current">
          <X size={14} />
        </button>
      </div>
    ))}
  </div>
);

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, iconColor, iconBg, onClick, loading }) => (
  <div
    onClick={onClick}
    className={`relative overflow-hidden bg-white rounded-2xl p-5 flex flex-col items-center gap-2.5 border border-gray-100 shadow-sm transition-all duration-200 ${onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg" : ""}`}
  >
    <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-50 ${iconBg}`} />
    <div className={`relative rounded-xl p-3 ${iconBg}`}>
      <Icon size={22} className={iconColor} strokeWidth={2} />
    </div>
    <p className="m-0 text-xs font-bold text-gray-400 tracking-widest uppercase">{label}</p>
    {loading
      ? <div className="w-9 h-3 rounded bg-gray-100 animate-pulse" />
      : <p className="m-0 text-2xl font-extrabold text-gray-900 leading-none">{value ?? "—"}</p>
    }
    {onClick && <ChevronRight size={13} className="absolute top-3.5 right-3.5 text-gray-300" />}
  </div>
);

// ─── SKELETON ─────────────────────────────────────────────────────────────────
const Sk = ({ className = "w-full h-4 rounded-lg" }) => (
  <div className={`bg-gray-100 animate-pulse ${className}`} />
);

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const MAP = {
    pending:   "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };
  const cls = MAP[status?.toLowerCase()] ?? "bg-gray-100 text-gray-700";
  const label = status ? status.charAt(0).toUpperCase() + status.slice(1) : status;
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide ${cls}`}>
      {label}
    </span>
  );
};

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
const SectionHeader = ({ title, count, action, onAction }) => (
  <div className="bg-gradient-to-r from-blue-400 to-blue-300 rounded-t-2xl px-5 py-3.5 flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <h3 className="m-0 text-white text-sm font-bold">{title}</h3>
      {count != null && (
        <span className="bg-white/20 text-white rounded-full px-2.5 py-0.5 text-xs font-bold">{count}</span>
      )}
    </div>
    {action && (
      <button
        onClick={onAction}
        className="bg-white/20 border border-white/35 text-white rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer hover:bg-white/30 transition-colors"
      >
        {action}
      </button>
    )}
  </div>
);

// ─── TOGGLE ───────────────────────────────────────────────────────────────────
const Toggle = ({ value, onChange, disabled }) => (
  <button
    onClick={() => !disabled && onChange(!value)}
    className={`relative w-12 h-7 rounded-full border-none transition-colors duration-250 flex-shrink-0 ${value ? "bg-green-500" : "bg-gray-300"} ${disabled ? "opacity-60 cursor-default" : "cursor-pointer"}`}
  >
    <span
      className={`absolute top-[5px] w-[18px] h-[18px] rounded-full bg-white shadow transition-all duration-250 ${value ? "left-[26px]" : "left-[5px]"}`}
    />
  </button>
);

// ─── PROFILE ROW ─────────────────────────────────────────────────────────────
const ProfileRow = ({ icon: Icon, iconBg, iconColor, label, sublabel, onClick, danger }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 py-3.5 bg-transparent border-none cursor-pointer w-full text-left group transition-all duration-150 hover:pl-1.5"
  >
    <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
      <Icon size={16} className={iconColor} />
    </div>
    <div className="flex-1">
      <p className={`m-0 text-sm font-semibold ${danger ? "text-red-500" : "text-gray-900"}`}>{label}</p>
      {sublabel && <p className="m-0 text-xs text-gray-400">{sublabel}</p>}
    </div>
    {!danger && <ChevronRight size={16} className="text-gray-300" />}
  </button>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const ExpertDashboard = () => {
  const { user, setUser } = useData();
  console.log(user);
  const [reviews, setReviews] = useState([]);
const [reviewsLoading, setReviewsLoading] = useState(true);
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [activeJobs, setActiveJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [availability, setAvailability] = useState(user?.availability ?? true);
  const [availLoading, setAvailLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = ++_toastId;
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  }, []);
  const removeToast = (id) => setToasts((p) => p.filter((t) => t.id !== id));
useEffect(() => {
  setAvailability(user?.availability ?? true);
}, [user]);
  useEffect(() => {
    if (!user?._id) return;
    setStatsLoading(true);
    axios.get(`${BASE}/bookservice/stats/${user._id}`)
      .then((res) => setStats(res.data.stats))
      .catch(() => addToast("Failed to load stats.", "error"))
      .finally(() => setStatsLoading(false));
  }, [user]);

  useEffect(() => {
  if (!user?._id) return;

  setReviewsLoading(true);

  axios
    .get(`${BASE}/bookservice/reviews/${user._id}`)
    .then((res) => setReviews(res.data?.reviews || []))
    .catch(() => addToast("Failed to load reviews", "error"))
    .finally(() => setReviewsLoading(false));
}, [user]);

  useEffect(() => {
    if (!user?._id) return;
    setJobsLoading(true);
    axios.get(`${BASE}/bookservice/expert/active/${user._id}`)
      .then((res) => setActiveJobs(res.data?.bookings || []))
      .catch(() => addToast("Failed to load active jobs.", "error"))
      .finally(() => setJobsLoading(false));
  }, [user]);

  const handleToggleAvailability = async (val) => {
    setAvailLoading(true);
    try {
      await axios.patch(`${BASE}/expert/${user._id}/availability`, { availability: val });
      setAvailability(val);
      addToast(`You are now ${val ? "Online" : "Offline"}.`, val ? "success" : "error");
    } catch {
      addToast("Could not update availability.", "error");
    } finally {
      setAvailLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="mt-18 min-h-screen bg-slate-100 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; font-family: 'DM Sans', 'Segoe UI', sans-serif; }
        @keyframes slideUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .animate-slide-up { animation: slideUp 0.25s ease; }
      `}</style>

      {/* ── NAVBAR ── */}
      {/* <nav className="bg-white sticky top-0 z-30 border-b border-gray-100 shadow-sm px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-br from-blue-700 to-blue-400 rounded-xl w-9 h-9 flex items-center justify-center">
            <Briefcase size={18} className="text-white" />
          </div>
          <span className="font-extrabold text-lg text-blue-800 tracking-tight">
            Local<span className="text-blue-500">Fixperts</span>
          </span>
        </div>

        <div className="flex gap-1">
          <Link to="/" className="text-gray-600 text-sm font-semibold px-3.5 py-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all no-underline">Dashboard</Link>
          <Link to="/expertbookings" className="text-gray-600 text-sm font-semibold px-3.5 py-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all no-underline">My Bookings</Link>
        </div>

        <div className="flex items-center gap-3.5">
          <div className={`flex items-center gap-1.5 text-xs font-semibold ${availability ? "text-green-600" : "text-gray-400"}`}>
            {availability ? <Wifi size={15} /> : <WifiOff size={15} />}
            <span>{availability ? "Online" : "Offline"}</span>
          </div>
          <Avatar name={user.name} photo={user.profilePhoto} size={36} />
        </div>
      </nav> */}

      {/* ── HERO ── */}
      <div className="mt-10 mx-10 px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Welcome back, {user.name}
          </h2>
          <p className="text-gray-600 mt-2">
            Here’s your latest stats and job updates.
          </p>
        </div>

        <div className="w-40 h-40  rounded-full flex items-center justify-center text-white text-lg overflow-hidden">
          {user.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt="Profile"
              className="w-40 h-40 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-400 shadow-lg"
            />
          ) : (
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name ?? "U"
              )}&background=3b82f6&color=fff&size=128`}
              alt={user.name ?? "User"}
              className="w-full h-full object-cover"
            />
          )}

        </div>
      </div>

      {/* ── STATS ── */}
      <div className="px-8 pt-5 max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={CheckCircle} label="Completed" value={stats?.completed ?? 0}
          iconColor="text-emerald-600" iconBg="bg-emerald-50" loading={statsLoading}
          onClick={() => navigate("/expertbookings?tab=Completed")} />
        <StatCard icon={Clock} label="Pending" value={stats?.pending ?? 0}
          iconColor="text-amber-600" iconBg="bg-amber-50" loading={statsLoading}
          onClick={() => navigate("/expertbookings?tab=Pending")} />
        <StatCard icon={TrendingUp} label="This Month" value={stats?.thisMonth ?? 0}
          iconColor="text-violet-600" iconBg="bg-violet-50" loading={statsLoading} />
        <StatCard icon={Star}
          label="Rating"
          value={stats?.rating != null ? `${Number(stats.rating).toFixed(1)}★` : user.rating.average.toFixed(1) }
          iconColor="text-amber-500" iconBg="bg-yellow-50" loading={statsLoading} />
      </div>

      {/* ── MAIN GRID ── */}
      <div className="px-8 pt-5 pb-14 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">

        {/* LEFT */}
        <div className="flex flex-col gap-6">

          {/* Active Jobs */}
          <div>
            <SectionHeader
              title="Active Jobs"
              count={activeJobs.length}
              action="All Bookings"
              onAction={() => navigate("/expertbookings?tab=Confirmed")}
            />
            <div className="bg-white rounded-b-2xl shadow-sm overflow-hidden min-h-28">
              {jobsLoading ? (
                <div className="p-5 flex flex-col gap-5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3.5 items-center">
                      <Sk className="w-11 h-11 rounded-full" />
                      <div className="flex-1 flex flex-col gap-2">
                        <Sk className="w-1/2 h-3 rounded" />
                        <Sk className="w-1/3 h-2.5 rounded" />
                      </div>
                      <Sk className="w-16 h-8 rounded-xl" />
                    </div>
                  ))}
                </div>
              ) : activeJobs.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3.5">
                    <Briefcase size={26} className="text-gray-300" />
                  </div>
                  <p className="text-gray-400 text-sm m-0">No active jobs right now</p>
                  <p className="text-gray-300 text-xs mt-1 m-0">New confirmed bookings will appear here</p>
                </div>
              ) : (
                activeJobs.map((job, i) => (
                  <div
                    key={job._id}
                    className={`flex items-center gap-4 px-5 py-4.5 transition-colors hover:bg-blue-50/40 ${i < activeJobs.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <Avatar name={job.userId?.name || "User"} size={48} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <p className="m-0 font-bold text-sm text-gray-900 truncate">{job.userId?.name || "User"}</p>
                        <StatusBadge status={job.status} />
                      </div>
                      <div className="flex gap-3.5 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Briefcase size={12} />{job.serviceType || job.service || "Service"}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={12} />{fmtDate(job.date)}
                        </span>
                        {job.address && (
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin size={12} />{job.address}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/expertbookings?tab=Confirmed")}
                      className="bg-gradient-to-r from-blue-600 to-blue-400 text-white border-none rounded-xl px-4 py-2 text-xs font-bold cursor-pointer flex items-center gap-1.5 flex-shrink-0 hover:scale-105 transition-transform"
                    >
                      View <ChevronRight size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* ⭐ REVIEWS SECTION */}
<div>
  <SectionHeader
    title="Recent Reviews"
    count={reviews.length}
    action="View All"
    onAction={() => navigate(`/expert/reviews/${user._id}`)}
  />

  <div className="bg-white rounded-b-2xl shadow-sm overflow-hidden min-h-28">

    {/* Loading */}
    {reviewsLoading ? (
      <div className="p-5 flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-3 items-center">
            <Sk className="w-10 h-10 rounded-full" />
            <div className="flex-1 flex flex-col gap-2">
              <Sk className="w-1/3 h-3" />
              <Sk className="w-2/3 h-2.5" />
            </div>
          </div>
        ))}
      </div>
    ) : reviews.length === 0 ? (
      <div className="p-10 text-center">
        <Star size={28} className="text-gray-300 mx-auto mb-2" />
        <p className="text-gray-400 text-sm">No reviews yet</p>
      </div>
    ) : (
      reviews.slice(0, 3).map((r, i) => (
        <div
          key={r._id}
          className={`px-5 py-4 flex gap-3 items-start hover:bg-gray-50 ${
            i < reviews.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          {/* Avatar */}
          <Avatar name={r.userId?.name || "User"} size={36} />

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-900">
                {r.userId?.name || "User"}
              </p>

              {/* ⭐ Rating */}
              <span className="text-yellow-500 text-xs font-bold">
                {"★".repeat(r.rating)}
              </span>
            </div>

            {/* Review */}
            {r.review && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {r.review}
              </p>
            )}

            {/* Date */}
            <p className="text-[10px] text-gray-400 mt-1">
              {fmtDate(r.createdAt)}
            </p>
          </div>
        </div>
      ))
    )}
  </div>
</div>

          {/* Manage Profile */}
          <div>
            <SectionHeader title="Manage Profile" />
            <div className="bg-white rounded-b-2xl shadow-sm px-6 py-1.5">
              {/* Availability toggle */}
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <p className="m-0 font-semibold text-sm text-gray-900">Availability</p>
                  <p className={`m-0 mt-0.5 text-xs ${availability ? "text-green-600" : "text-gray-400"}`}>
                    {availability ? "You're accepting new jobs" : "Not accepting jobs"}
                  </p>
                </div>
                <Toggle value={availability} onChange={handleToggleAvailability} disabled={availLoading} />
              </div>
              <div className="border-b border-gray-100">
                <ProfileRow
                  icon={Pencil} iconBg="bg-blue-50" iconColor="text-blue-600"
                  label="Edit Profile" sublabel="Update info, skills & photo"
                  onClick={() => navigate("/edit-profile/expert")}
                />
              </div>
              <ProfileRow
                icon={LogOut} iconBg="bg-red-50" iconColor="text-red-500"
                label="Log Out" sublabel="End your current session"
                onClick={handleLogout} danger
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">

          {/* Pending requests */}
          <div>
            <SectionHeader
              title="Pending Requests"
              count={statsLoading ? "…" : (stats?.pending ?? 0)}
              action="View All"
              onAction={() => navigate("/expertbookings?tab=Pending")}
            />
            <div className="bg-white rounded-b-2xl shadow-sm p-5">
              {statsLoading ? (
                <div className="flex flex-col gap-3">
                  <Sk className="w-full h-12 rounded-xl" />
                  <Sk className="w-full h-9 rounded-xl" />
                </div>
              ) : (stats?.pending ?? 0) === 0 ? (
                <div className="text-center py-5">
                  <CheckCircle size={30} className="text-gray-300 mx-auto mb-2.5" />
                  <p className="text-gray-400 m-0 text-sm">No pending requests</p>
                </div>
              ) : (
                <div>
                  <p className="m-0 mb-3.5 text-xs text-gray-500 leading-relaxed">
                    You have <strong className="text-amber-600 text-xl">{stats.pending}</strong> pending request{stats.pending !== 1 ? "s" : ""} waiting for your confirmation.
                  </p>
                  <button
                    onClick={() => navigate("/expertbookings?tab=Pending")}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-white border-none rounded-xl py-2.5 text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                  >
                    Review Requests <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile summary card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-blue-400 to-blue-100 px-6 py-7 flex flex-col items-center gap-3">
              <Avatar name={user.name} photo={user.profilePhoto} size={76} className="border-4 border-white/40" />
              <div className="text-center">
                <h3 className="m-0 text-white text-lg font-extrabold">{user.name}</h3>
                <p className="m-0 mt-1 text-white/65 text-xs">{user.email}</p>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3.5 py-1.5">
                <span className={`w-2 h-2 rounded-full ${availability ? "bg-green-400" : "bg-gray-400"}`} />
                <span className="text-white text-xs font-semibold">
                  {availability ? "Available for Jobs" : "Currently Offline"}
                </span>
              </div>
            </div>
            <div className="p-5 flex flex-col gap-2.5">
              {[
                { label: "Jobs Completed", value: stats?.completed ?? "—", icon: CheckCircle, color: "text-emerald-600" },
                { label: "Avg. Rating",     value: stats?.rating != null ? `${Number(stats.rating.toFixed(1))} / 5.0` : `${user.rating.average.toFixed(1)}/ 5.0`, icon: Star, color: "text-amber-500" },
                { label: "This Month",      value: stats?.thisMonth ?? "—", icon: TrendingUp, color: "text-violet-600" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <Icon size={15} className={color} />
                    <span className="text-xs text-gray-500 font-medium">{label}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{statsLoading ? "…" : value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="m-0 mb-3.5 text-xs font-bold text-gray-900 uppercase tracking-widest">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: "Pending",   tab: "Pending",   bg: "bg-yellow-50",  color: "text-yellow-800",  icon: Clock },
                { label: "Confirmed", tab: "Confirmed", bg: "bg-green-50",   color: "text-green-800",   icon: CheckCircle },
                { label: "Completed", tab: "Completed", bg: "bg-blue-50",    color: "text-blue-800",    icon: Star },
                { label: "Cancelled", tab: "Cancelled", bg: "bg-red-50",     color: "text-red-800",     icon: AlertCircle },
              ].map(({ label, tab, bg, color, icon: Icon }) => (
                <button
                  key={tab}
                  onClick={() => navigate(`/expertbookings?tab=${tab}`)}
                  className={`${bg} border-none rounded-2xl p-3.5 cursor-pointer flex flex-col items-center gap-1.5 hover:scale-105 transition-transform`}
                >
                  <Icon size={20} className={color} />
                  <span className={`text-xs font-bold ${color}`}>{label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Toast toasts={toasts} remove={removeToast} />
    </div>
  );
};

export default ExpertDashboard;