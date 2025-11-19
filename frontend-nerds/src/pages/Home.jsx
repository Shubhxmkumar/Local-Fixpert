import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Review from "../components/Review";
import AIChatAssistant from "../components/AiChatBot";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AIChatAssistant />
      <Services />
      <About />
      {/* <Review /> */}
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
