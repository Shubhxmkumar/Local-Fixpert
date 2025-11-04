import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [expert, setExpert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedExpert = localStorage.getItem("expert");
    if (storedExpert) {
      setExpert(JSON.parse(storedExpert));
    } else {
      navigate("/expert"); // Redirect if no data
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("expert");
    navigate("/expert");
  };

  if (!expert) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4 pt-20">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl p-8 text-center">
        {/* Profile Photo */}
        <div className="flex justify-center mb-6">
          {expert.profilePhoto ? (
            <img
              src={expert.profilePhoto}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
          ) : (
            <FaUserCircle className="text-blue-600" size={100} />
          )}
        </div>

        {/* Info */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {expert.fullName}
        </h2>
        <p className="text-gray-600 mb-2">{expert.email}</p>
        <p className="text-gray-600 mb-6">{expert.mobile}</p>

        <hr className="border-white/40 mb-6" />

        {/* Professional Info */}
        <div className="text-left text-gray-700 space-y-2 mb-6">
          <p>
            <strong>Category:</strong> {expert.category || "—"}
          </p>
          <p>
            <strong>Experience:</strong> {expert.experience || "—"}
          </p>
          <p>
            <strong>Languages:</strong> {expert.language || "—"}
          </p>
          <p>
            <strong>Service Area:</strong> {expert.serviceArea || "—"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button className="w-full py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-2 border border-red-500 text-red-500 rounded-full font-semibold hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
