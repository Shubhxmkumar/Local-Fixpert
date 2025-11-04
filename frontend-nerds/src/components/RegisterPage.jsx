import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import heroimg from "../assets/home-page/LoginWorker.png";
import api from "../api/axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await api.post("/register", { name, email, password });
      alert("🎉 Registration successful!");
      setRedirect(true);
    } catch (e) {
      console.error(e);
      alert("Registration failed. Please try again later.");
    }
  }

  if (redirect) return <Navigate to="/" />;

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-10">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>

        <form className="space-y-4" onSubmit={registerUser}>
          <input
            className="border border-gray-300 rounded-xl py-2 px-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />

          <input
            className="border border-gray-300 rounded-xl py-2 px-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />

          <input
            className="border border-gray-300 rounded-xl py-2 px-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 w-full text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-md"
=======
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 px-6 py-10">
      {/* Left Section — Illustration + Text */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 text-center animate-fadeIn space-y-6">
        <img
          src={heroimg}
          alt="Registration Illustration"
          className="w-96 drop-shadow-xl animate-float"
        />
        <h2 className="text-3xl font-bold text-gray-800">
          Join LocalExpert 🚀
        </h2>
        <p className="text-gray-600 w-2/3">
          Connect with trusted experts near you. Create your account and start
          your journey today!
        </p>
      </div>

      {/* Right Section — Registration Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 sm:p-10 border border-blue-100 animate-slideUp">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-6">
          Create an Account
        </h1>

        <form className="space-y-5" onSubmit={registerUser}>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Full Name
            </label>
            <input
              className="border border-gray-300 rounded-xl py-2 px-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Email Address
            </label>
            <input
              className="border border-gray-300 rounded-xl py-2 px-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Password
            </label>
            <input
              className="border border-gray-300 rounded-xl py-2 px-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
              type="password"
              placeholder=""
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
            />
          </div>

          {/* Register Button */}
          <button
            className="bg-blue-600 hover:bg-blue-700 w-full text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02]"
>>>>>>> 0d2e530 (fully backed and some frontend file uploaded)
            type="submit"
          >
            Register
          </button>

<<<<<<< HEAD
          <div className="text-center text-gray-600 text-sm mt-4">
            Already a member?{" "}
            <Link className="underline text-blue-600 font-medium" to="/login">
=======
          {/* Redirect to Login */}
          <div className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <Link
              className="underline text-blue-600 font-medium hover:text-blue-800"
              to="/login"
            >
>>>>>>> 0d2e530 (fully backed and some frontend file uploaded)
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

/* -------------------- ANIMATIONS (Add in index.css or tailwind.css) -------------------- */
/* Add this in your global CSS file */
<style jsx global>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 1s ease-in-out forwards;
  }
  .animate-slideUp {
    animation: slideUp 1.2s ease-in-out forwards;
  }
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
`}</style>;
