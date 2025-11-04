// import { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import axios from "axios";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [redirect, setRedirect] = useState(false);

//   axios.defaults.withCredentials = true;

//   async function handleLogin(ev) {
//     ev.preventDefault();
//     try {
//       await axios.post("http://localhost:3000/login", { email, password });
//       alert("Login successful! 🎉");
//       setRedirect(true);
//     } catch (e) {
//       if (e.response?.status === 401) {
//         alert("Invalid email or password");
//       } else {
//         alert("Server error. Please try again later.");
//       }
//     }
//   }

//   if (redirect) return <Navigate to="/" />;

//   return (
//     <div className="mt-4 grow flex items-center justify-around">
//       <div>
//         <h1 className="text-4xl text-center mb-4">Login</h1>
//         <form className="max-w-md mx-auto" onSubmit={handleLogin}>
//           <input
//             className="border-2 rounded-2xl py-1 px-2 w-full mb-2"
//             type="email"
//             placeholder="your@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             className="border-2 rounded-2xl py-1 px-2 w-full mb-2"
//             type="password"
//             placeholder="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button className="bg-blue-500 w-full text-white p-2 rounded-2xl hover:bg-blue-600">
//             Login
//           </button>
//           <div className="text-center py-2 text-gray-500">
//             Don’t have an account?{" "}
//             <Link className="underline text-black" to="/register">
//               Register
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import heroimg from "../assets/home-page/LoginWorker.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  axios.defaults.withCredentials = true;

  async function handleLogin(ev) {
    ev.preventDefault();
    try {
      await axios.post("http://localhost:3000/login", { email, password });
      alert("🎉 Login successful!");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-10">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            className="border border-gray-300 rounded-xl py-2 px-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="border border-gray-300 rounded-xl py-2 px-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 w-full text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-md"
            type="submit"
          >
            Login
          </button>

          <div className="text-center text-gray-600 text-sm mt-4">
            Don’t have an account?{" "}
            <Link className="underline text-blue-600 font-medium" to="/signup">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

/* -------------------- ANIMATIONS (Same as Register Page) -------------------- */
/* Add these in your global CSS (index.css or tailwind.css) */
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
