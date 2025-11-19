import { useEffect, useState, useRef } from "react";
import { FaStar } from "react-icons/fa";

export default function Review() {
  const token = localStorage.getItem("token");

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState([]);


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [websiteData, setWebsiteData] = useState({
    author: "",
    reviewText: "",
  });

  const handleWebSiteRatingChange = (e) => {
    setWebsiteData({ ...websiteData, [e.target.name]: e.target.value });
  };
  const handleWebsiteRatingSubmit = async (e) => {
    e.preventDefault();
    if (userRating > 0) {
      setIsSubmitting(true);
      setError(null);

      try {
        const websitRatingData = {
          stars: userRating,
          reviewText: websiteData.reviewText,
          author: websiteData.author,
        };

        const response = await axios.post(
          "http://localhost:3000/review/review-insert",
          websitRatingData
        );

        toast.success("Rating submitted successfully!");

        setUserRating(0);
        setWebsiteData({ author: "", reviewText: "" });
        fetchWebsiteRatings();
      } catch (err) {
        console.error("Error submitting rating:", err);
        setError("Failed to submit rating. Please try again.");
        toast.error("Failed to submit rating");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-xl mt-10 mx-auto p-6 bg-white rounded-2xl shadow-lg border border-blue-100">
  <form onSubmit={handleWebsiteRatingSubmit} className="space-y-4">
    <div className="text-center mb-4">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
        Rating & Reviews
      </h1>

      <div className="flex justify-center mt-4 gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setUserRating(star)}
            className="focus:outline-none transform hover:scale-110 transition duration-150"
          >
            <FaStar
              className={`h-9 w-9 drop-shadow-sm ${
                star <= (hoverRating || userRating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>

    <div>
      <label
        htmlFor="author"
        className="block mb-1 text-gray-600 font-semibold"
      >
        Your Name
      </label>
      <input
        id="author"
        type="text"
        name="author"
        value={websiteData.author}
        onChange={handleWebSiteRatingChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
        required
      />
    </div>

    <div>
      <label
        htmlFor="reviewText"
        className="block mb-1 text-gray-600 font-semibold"
      >
        Your Review
      </label>
      <textarea
        id="reviewText"
        name="reviewText"
        value={websiteData.reviewText}
        onChange={handleWebSiteRatingChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
        placeholder="Share your experience…"
        rows="3"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2.5 px-4 rounded-xl shadow hover:bg-blue-800 transition duration-300  font-semibold"
      disabled={userRating === 0 || isSubmitting}
    >
      {isSubmitting ? "Submitting..." : "Submit Rating"}
    </button>

    {error && <p className="text-red-500 text-center">{error}</p>}
  </form>
</div>

  );
}
