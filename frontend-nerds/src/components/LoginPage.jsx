import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  axios.defaults.withCredentials = true;

  async function handleLogin(ev) {
    ev.preventDefault();
    try {
      await axios.post("http://localhost:3000/login", { email, password });
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
    <div className="mt-4 grow flex items-center justify-around">
      <div>
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input
            className="border-2 rounded-2xl py-1 px-2 w-full mb-2"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border-2 rounded-2xl py-1 px-2 w-full mb-2"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-blue-500 w-full text-white p-2 rounded-2xl hover:bg-blue-600">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don’t have an account?{" "}
            <Link className="underline text-black" to="/register">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
