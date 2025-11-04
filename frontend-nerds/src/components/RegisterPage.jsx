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
            type="submit"
          >
            Register
          </button>

          <div className="text-center text-gray-600 text-sm mt-4">
            Already a member?{" "}
            <Link className="underline text-blue-600 font-medium" to="/login">
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
