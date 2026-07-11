import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../Context/DataContext";

import axios from "axios";

const EditProfile = () => {
    const navigate = useNavigate();
    const { user, setUser,url} = useData();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        mobile: "",
        category: "",
        experience: "",
        language: "",
        serviceArea: "",
        profilePhoto: "",
    });

    const [loading, setLoading] = useState(false);

    const services = [
        "Plumbing",
        "Electrician",
        "House Cleaning",
        "AC Servicing",
        "Carpenter",
        "Mover",
        "Wall Painter",
    ];

    /* ---------------- Load Existing Data ---------------- */
    useEffect(() => {
        if (!user) {
            navigate("/expert/login");
        } else {
            setForm(user);
        }
    }, [user, navigate]);

    /* ---------------- Handle Input ---------------- */
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            const file = files[0];

            // ✅ File size validation (2MB)
            if (file.size > 2 * 1024 * 1024) {
                return alert("Image must be less than 2MB");
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prev) => ({
                    ...prev,
                    profilePhoto: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    /* ---------------- Validation ---------------- */
    const validate = () => {
        if (!form.fullName) return "Full name required";
        if (!form.email) return "Email required";
        if (!form.category) return "Select a category";
        return null;
    };

    /* ---------------- Update Profile ---------------- */
    const handleUpdate = async () => {
        const stored = user;

        if (!stored || !stored._id) {
            alert("Please login again");
            return navigate("/expert/login");
        }

        try {
            setLoading(true);

            const payload = {
                fullName: form.fullName,
                mobile: form.mobile,
                category: form.category,
                experience: form.experience,
                language: form.language,
                serviceArea: form.serviceArea,
                profilePhoto: form.profilePhoto,
            };

            const res = await axios.put(
                `${url}/expert/update/${stored._id}`,
                payload
            );

            // ✅ USE res HERE (inside try)
            // localStorage.setItem("expert", JSON.stringify(res.data));
            const expert = {
                ...res.data,
                name: res.data.fullName, // map fullName → name
            };
            setUser(expert);

            alert("Profile updated successfully!");
            navigate("/profile");

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F6FAFF] py-16 px-4 pt-28">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center mb-10">
                    Edit Profile
                </h2>

                {/* Grid Layout */}
                <div className="grid md:grid-cols-2 gap-10">

                    {/* ---------------- PERSONAL INFO ---------------- */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 border-l-4 border-blue-500 pl-2">
                            Personal Information
                        </h3>

                        <div className="space-y-5">

                            <input
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <input
                                name="mobile"
                                value={form.mobile}
                                onChange={handleChange}
                                placeholder="Mobile Number"
                                className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            {/* Profile Image */}
                            <div>
                                {form.profilePhoto && (
                                    <img
                                        src={form.profilePhoto}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full mb-3 object-cover"
                                    />
                                )}

                                <input
                                    type="file"
                                    name="profilePhoto"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full border rounded-xl px-3 py-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ---------------- PROFESSIONAL INFO ---------------- */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 border-l-4 border-blue-500 pl-2">
                            Professional Information
                        </h3>

                        <div className="space-y-5">

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Service</option>
                                {services.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>

                            <input
                                name="experience"
                                value={form.experience}
                                onChange={handleChange}
                                placeholder="Experience (e.g. 5 years)"
                                className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                name="language"
                                value={form.language}
                                onChange={handleChange}
                                placeholder="Languages"
                                className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                name="serviceArea"
                                value={form.serviceArea}
                                onChange={handleChange}
                                placeholder="Service Area"
                                className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                </div>

                {/* ---------------- BUTTON ---------------- */}

                <div className="text-center mt-10 gap-15">
                    <button
                        onClick={() => navigate("/profile")}
                        className={`px-10 my-8 py-3 rounded-xl text-white font-semibold transition
                                 bg-blue-600 hover:bg-blue-700 mx-8
                            `}
                    >Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className={`px-10 my-8 py-3 rounded-xl text-white font-semibold transition ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;