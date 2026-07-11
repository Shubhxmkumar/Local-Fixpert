import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import Navbar from "./Navbar";
import { useData } from "../Context/DataContext";

export default function ExpertProfile() {
  const { expertId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [expert, setExpert] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const {url} = useData();
  useEffect(() => {
    // ✅ Fetch reviews
    axios
      .get(`${url}/bookservice/reviews/${expertId}`)
      .then((res) => {
        const data = res.data.reviews || [];
        setReviews(data);

        if (data.length > 0) {
          const avg =
            data.reduce((acc, r) => acc + r.rating, 0) / data.length;
          setAvgRating(avg.toFixed(1));
        }
      })
      .catch(console.log);

    // ✅ Fetch expert profile
    axios
      .get(`${url}/expert/experts`)
      .then((res) => {
        const found = res.data.find((e) => e._id === expertId);
        setExpert(found);
      })
      .catch(console.log);

  }, [expertId]);

  // ⭐ stars
  const renderStars = (rating = 0) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      )}
    </div>
  );

  if (!expert) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <> <Navbar/>
    <div className="min-h-screen bg-[#F6FAFF] pt-28 px-4 sm:px-6 lg:px-12">

      {/* 🔷 PROFILE HEADER */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-10 border border-blue-100">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          
          <img
            src={
              expert.profilePhoto ||
              `https://ui-avatars.com/api/?name=${expert.fullName}`
            }
            alt={expert.fullName}
            className="w-32 h-32 rounded-full border-2 border-blue-500 object-cover"
          />

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {expert.fullName}
            </h2>

            <p className="text-blue-600 font-medium">
              {expert.category}
            </p>

            {/* ⭐ rating */}
            <div className="mt-2 flex items-center gap-2 justify-center sm:justify-start">
              {renderStars(Math.round(avgRating))}
              <span className="text-gray-600 text-sm">
                {avgRating} ({reviews.length} reviews)
              </span>
            </div>

            {/* 🟢 availability */}
            <p
              className={`mt-2 text-sm font-semibold ${
                expert.isAvailable
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {expert.isAvailable ? "🟢 Available" : "🔴 Not Available"}
            </p>

            {/* 📍 info */}
            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p><b>📍 Location:</b> {expert.serviceArea}</p>
              <p><b>📞 Contact:</b> {expert.mobile}</p>
              <p><b>👥 Clients:</b> {expert.clients || 0}</p>
              <p><b>🛠 Experience:</b> {expert.experience} yrs</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔷 REVIEWS SECTION */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Customer Reviews
        </h3>

        {reviews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <p className="text-gray-400 text-lg">No reviews yet 😔</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((r) => (
              <div
                key={r._id}
                className="bg-white p-5 rounded-xl shadow border border-gray-100"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {r.userId?.name || "User"}
                    </h4>
                    {renderStars(r.rating)}
                  </div>

                  <span className="text-xs text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {r.review && (
                  <p className="text-gray-600 mt-3">
                    {r.review}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}