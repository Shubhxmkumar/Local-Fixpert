import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import heroimg from "../assets/home-page/LoginWorker.png"; // ✅ Make sure this path is correct
import { useData } from "../Context/DataContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
const { setUser } = useData();
  axios.defaults.withCredentials = true; // Optional: keep if using cookies/sessions

  async function handleLogin(ev) {
    ev.preventDefault();
    try {
      await axios.post("http://localhost:3000/login", { email, password });
      setUser(email);
      alert("Login successful! 🎉");

      setRedirect(true);
    } catch (e) {
      if (e.response?.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("Server error. Please try again later.");
      }
    }
  }

  if (redirect) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 px-6 py-10">
      {/* ---------------- Left Section ---------------- */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 text-center animate-fadeIn space-y-6">
        <img
          src={heroimg}
          alt="Login Illustration"
          className="w-96 drop-shadow-xl animate-float"
        />
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h2>
        <p className="text-gray-600 w-2/3">
          Log in to continue connecting with trusted local experts near you.
        </p>
      </div>

      {/* ---------------- Right Section (Login Form) ---------------- */}
      <div className="w-full md:w-1/2 max-w-md bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 sm:p-10 border border-blue-100 animate-slideUp">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-6">
          Login to Your Account
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Email
            </label>
            <input
              className="border border-gray-300 rounded-xl py-2 px-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Password
            </label>
            <input
              className="border border-gray-300 rounded-xl py-2 px-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2 accent-blue-600" />
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            className="bg-blue-600 hover:bg-blue-700 w-full text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02]"
            type="submit"
          >
            Login
          </button>

          {/* Redirect to Register */}
          <div className="text-center text-gray-600 text-sm mt-4">
            Don’t have an account?{" "}
            <Link
              className="underline text-blue-600 font-medium hover:text-blue-800"
              to="/signup"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}