import { Routes, Route } from "react-router-dom";
import axios from "axios";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import BookingPage from "./components/BookingPage"; 

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/booking" element={<BookingPage />} />
    </Routes>
  );
}

export default App;
