import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookService from "./pages/BookService";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ExpertPage from "./pages/ExpertPage";
import BecomeExpert from "./pages/Profile";
import Profile from "./pages/Profile";
import ExpertLogin from "./components/ExpertLogin";
import ExpertBookings from "./components/ExpertBookings";
import EditExpertProfile from "./components/EditExpertProfile";
import axios from "axios";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import MyBookings from "./pages/Mybookings";
import ExpertReviews from "./components/ExpertReviews"
import Rebook from "./components/Rebook";

 import { ToastProvider } from "./components/toast/ToastContext";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <ToastContainer position="top-center" /> */}
        <ToastProvider>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/bookservice" element={<BookService />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/expert" element={<ExpertPage />} />
          <Route path="expert/login" element={<ExpertLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile/expert" element={<EditExpertProfile />} />
          <Route path="/expertbookings" element={<ExpertBookings />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/expert/reviews/:expertId" element={<ExpertReviews />} />
          <Route path="/rebook/:id" element={<Rebook />} />
        </Routes>
        </ToastProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
