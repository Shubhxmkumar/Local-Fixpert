import { useEffect, useState } from "react";
import axios from "axios";

const ExpertDashboard = () => {
  const [bookings, setBookings] = useState([]);

  const expert = JSON.parse(localStorage.getItem("expert"));

  // ✅ Fetch bookings
  useEffect(() => {
    if (!expert?._id) return;

    axios
      .get(
        `http://localhost:3000/bookservice/expert/${expert._id}`
      )
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Update status
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/bookservice/status/${id}`,
        { status }
      );

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? res.data : b))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Status colors
  const getStatusColor = (status) => {
    const s = status.toLowerCase();

    if (s === "completed") return "bg-green-100 text-green-700";
    if (s === "cancelled") return "bg-red-100 text-red-700";
    if (s === "accepted") return "bg-blue-100 text-blue-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        My Bookings
      </h2>
      {/* <Link to="/profile">
      <h4 className="text-3xl font-bold mb-8 text-center text-blue-700">
        My Profile
      </h4>
        </Link> */}


      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No bookings found
        </p>
      ) : (
        <div className="space-y-5">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              {/* INFO */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p>
                    <b>User:</b>{" "}
                    {b.userId?.name || "Unknown"}
                  </p>

                  <p>
                    <b>Mobile:</b>{" "}
                    {b.userId?.mobile || "N/A"}
                  </p>

                  <p>
                    <b>Service:</b>{" "}
                    {b.service || "Not specified"}
                  </p>

                  <p>
                    <b>Date:</b>{" "}
                    {new Date(
                      b.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                {/* STATUS */}
                <div className="flex items-start sm:items-end">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                </div>
              </div>

              {/* 🔥 ACTION BUTTONS */}
              <div className="mt-4 flex flex-wrap gap-2">
                {b.status.toLowerCase() === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(b._id, "Accepted")
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(b._id, "Cancelled")
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {b.status.toLowerCase() === "accepted" && (
                  <button
                    onClick={() =>
                      updateStatus(b._id, "Completed")
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpertDashboard;