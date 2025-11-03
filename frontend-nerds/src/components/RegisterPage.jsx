import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", { name, email, password });
      alert("Registration successful!");
      setRedirect(true);
    } catch (e) {
      alert("Registration failed. Please try again later.");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-30">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            className="border-2 rounded-2xl py-1 px-2 w-full mb-2"
            type="text"
            placeholder="Nitish Bharti"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            className="border-2 rounded-2xl py-1 px-2 w-full mb-2"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            className="border-2 rounded-2xl py-1 px-2 w-full mb-2"
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="bg-blue-500 w-full text-white p-2 rounded-2xl">
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
