import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Hero from "./components/Hero";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookService from "./pages/BookService";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookservice" element={<BookService/>} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
