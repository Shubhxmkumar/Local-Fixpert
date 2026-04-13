
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useData } from "../Context/DataContext";
import {
  CheckCircle,
  Clock,
  Pencil,
  Star,
  LogOut,
} from "lucide-react";

const ExpertDashboard = () => {
  const { user, setUser } = useData();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [activeJobs, setActiveJobs] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    axios
      .get(`http://localhost:3000/bookservice/stats/${user._id}`)
      .then((res) => { setStats(res.data.stats); console.log(res.data.stats); })
      .catch((err) => console.log(err));
  }, [user]);
  useEffect(() => {
    if (!user?._id) return;

    axios
      .get(`http://localhost:3000/bookservice/expert/active/${user._id}`)
      .then((res) => {
setActiveJobs(res.data?.bookings || []);        console.log("Active Jobs:", res.data.bookings);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const handleLogout = () => {
    // localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    // setDropdown(false);
  };

  return (
    <div className="bg-[#eef2f7] min-h-screen ">
      {/* HERO */}
      <div className="mt-10 mx-25 px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
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

      {/* STATS */}
      <div className="px-6 mx-25 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<CheckCircle />} label="Job completed" value={stats?.completed ?? 0} onClick={() => navigate("/expertbookings?tab=Completed")} />
        <StatCard icon={<Clock />} label="Pending Requests" value={stats?.pending ?? 0} onClick={() => navigate("/expertbookings?tab=Pending")} />
        <StatCard icon={<Pencil />} label="Edit Profile" value="" onClick={() => navigate("/edit-profile/expert")} />
        <StatCard icon={<Star />} label="Rating" value="4.6 ⭐" />
      </div>

      {/* MAIN GRID */}
      <div className="px-6 mx-25 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT LARGE CARD */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 min-h-[300px]">
          <h3 className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block mb-4">
            Manage Profile
          </h3>

          <p className="text-gray-500">
            Profile details and analytics will appear here.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">

          {/* ACTIVE JOB */}
          <div className="bg-white rounded-2xl shadow p-4">
  <h3 className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block mb-4">
  Active Jobs ({activeJobs.length})
</h3>

  {activeJobs.length === 0 ? (
    <p className="text-gray-400 text-sm">No active jobs</p>
  ) : (
    activeJobs.slice(0, 3).map((job) => (
      <div
        key={job._id}
        className="flex justify-between items-center border-b py-3 last:border-none"
      >
        <div>
          <p className="font-semibold">
            {job.userId?.name || "User"}
          </p>
          <p className="text-sm text-gray-500">
            {job.serviceType} • {new Date(job.date).toLocaleDateString()}
          </p>

          {/* Status badge */}
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              job.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {job.status}
          </span>
        </div>

        <button
          onClick={() => navigate("/expertbookings?tab=Confirmed")}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
        >
          View
        </button>
      </div>
    ))
  )}
</div>

          {/* PROFILE ACTIONS */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-blue-600 font-semibold mb-4">
              Manage Profile
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Availability: Online</span>
                <div className="w-10 h-5 bg-green-500 rounded-full"></div>
              </div>

              <button className="flex items-center gap-2 text-gray-700" onClick={() => navigate("/edit-profile/expert")}>
                <Pencil size={16} /> Edit Profile
              </button>

              <button className="flex items-center gap-2 text-red-500" onClick={handleLogout}>
                <LogOut size={16} /> Log out
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl shadow p-4 text-center cursor-pointer hover:shadow-lg transition"
  >
    <div className="text-blue-600 flex justify-center mb-2">
      {icon}
    </div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default ExpertDashboard;