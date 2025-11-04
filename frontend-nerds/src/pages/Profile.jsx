import { useEffect, useState } from "react";
import { FaUserCircle, FaEdit, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Profile = () => {
  const [expert, setExpert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedExpert = localStorage.getItem("expert");
    if (storedExpert) {
      setExpert(JSON.parse(storedExpert));
    } else {
      navigate("/expert"); // Redirect if no data found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("expert");
    navigate("/expert");
  };

  if (!expert) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg border border-blue-100 p-8 sm:p-10 relative overflow-hidden">
        {/* Background Accent Circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

        {/* Header */}
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-blue-700 mb-8">
          Expert Profile
        </h1>

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
          {/* Profile Image */}
          <div className="relative">
            {expert.profilePhoto ? (
              <img
                src={expert.profilePhoto}
                alt="Profile"
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-blue-400 shadow-lg"
              />
            ) : (
              <FaUserCircle className="text-blue-500 shadow-sm" size={130} />
            )}
            <button
              className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full text-sm shadow-md"
              title="Edit Profile Photo"
            >
              <FaEdit size={14} />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              {expert.fullName}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              {expert.email}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              {expert.mobile}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-gray-500 text-sm font-semibold">Category</p>
                <p className="text-gray-800 text-base">
                  {expert.category || "—"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm font-semibold">
                  Experience
                </p>
                <p className="text-gray-800 text-base">
                  {expert.experience || "—"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm font-semibold">Languages</p>
                <p className="text-gray-800 text-base">
                  {expert.language || "—"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm font-semibold">
                  Service Area
                </p>
                <p className="text-gray-800 text-base">
                  {expert.serviceArea || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          {/* <button className="flex items-center justify-center gap-2 py-2 px-6 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md">
            <FaEdit /> Edit Profile
          </button> */}

          <Link to={"/"}>
            <button className="flex items-center justify-center gap-2 py-2 px-6 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md">
              <FaHome /> Home
            </button>
          </Link>

          {/* <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 py-2 px-6 border border-red-500 text-red-500 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md"
          >
            <FaSignOutAlt /> Logout
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
