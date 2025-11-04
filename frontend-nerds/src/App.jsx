<<<<<<< HEAD
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
=======
>>>>>>> 0d2e530 (fully backed and some frontend file uploaded)
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Hero from "./components/Hero";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookService from "./pages/BookService";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
<<<<<<< HEAD
=======
import MyBookings from "../../BookingPage";
import ExpertPage from "./pages/ExpertPage";

>>>>>>> 0d2e530 (fully backed and some frontend file uploaded)
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          <Route path="/bookservice" element={<BookService/>} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
=======
          <Route path="/bookservice" element={<BookService />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/expert" element={<ExpertPage />} />
>>>>>>> 0d2e530 (fully backed and some frontend file uploaded)
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
