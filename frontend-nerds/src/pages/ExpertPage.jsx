import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ExpertPage = () => {
  const navigate = useNavigate();

  // Form State
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    profilePhoto: "",
    category: "",
    experience: "",
    language: "",
    serviceArea: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem("expert", JSON.stringify(form));

    // Redirect to Profile Page
    navigate("/profile");
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#F6FAFF] py-16 px-4 sm:px-8 lg:px-20 pt-28">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Become a Local Expert
          </h1>

          {/* ✅ Two-column responsive layout */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">
                Personal Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Eg. 9876543210"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">
                Professional Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Eg. Plumber / Electrician"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="Eg. 5 years"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Language Spoken
                  </label>
                  <input
                    type="text"
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    placeholder="Eg. English, Hindi, Punjabi"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Service Area
                  </label>
                  <input
                    type="text"
                    name="serviceArea"
                    value={form.serviceArea}
                    onChange={handleChange}
                    placeholder="Eg. Amritsar, Jalandhar, Ludhiana"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* ✅ Submit Button */}
            <div className="col-span-1 md:col-span-2 text-center mt-10">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-xl transition"
              >
                Submit Details
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ExpertPage;
