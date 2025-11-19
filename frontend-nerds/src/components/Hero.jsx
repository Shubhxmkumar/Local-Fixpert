import { Link, NavLink } from "react-router-dom";
import bg from "../assets/home-page/hero-bg.png";
import heroimg from "../assets/home-page/hero-man.png";
import { motion } from "framer-motion";
import { RiRobot2Line } from "react-icons/ri";

import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RiAiGenerate } from "react-icons/ri";
import AiChatBot from "./AiChatBot";

const Hero = () => {
  const [showAIChat, setShowAIChat] = useState(false);

  const handleAIChatSubmit = async (message) => {
    try {
      const response = await mockAIChatAPI(message);
      return response;
    } catch (e) {
      console.error("AI Chat Error :", e);
      return "Sorry, I'm having trouble understanding. Could you try again?";
    }
  };

  const mockAIChatAPI = async (message) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lowerMessage = message.toLowerCase();

    // Service categories and suggestions
    const services = {
      all: [
        "Plumber",
        "Electrician",
        "Carpenter",
        "AC Repair",
        "Painter",
        "Cleaner",
      ],
      plumbing: [
        "Fix leakage",
        "Tap installation",
        "Pipe repair",
        "Bathroom fitting",
      ],
      electrician: [
        "Fan repair",
        "Wiring fix",
        "Switchboard installation",
        "Light fitting",
      ],
      carpenter: [
        "Furniture repair",
        "Door alignment",
        "Custom shelves",
        "Bed fixing",
      ],
      cleaning: [
        "Home deep clean",
        "Kitchen cleaning",
        "Bathroom cleaning",
        "Sofa clean",
      ],
      ac: ["AC service", "Gas refill", "Cooling issue fix", "AC installation"],
      painter: [
        "Wall painting",
        "Ceiling painting",
        "Room makeover",
        "Waterproof coating",
      ],
    };

    // Basic triggers
    const greetings = ["hello", "hi", "hey"];
    const farewells = ["bye", "goodbye"];
    const ownerQueries = ["owner", "who is the owner", "founder"];

    // Greet user
    if (greetings.some((w) => lowerMessage.includes(w))) {
      return "Hello! I'm Fixperts AI. I can help you book services like plumbing, electrical, cleaning, carpentry and much more. What help do you need today?";
    }

    // Goodbyes
    if (farewells.some((w) => lowerMessage.includes(w))) {
      return "Goodbye! If anything breaks again, you know where to find me.";
    }

    // Website owner
    if (ownerQueries.some((w) => lowerMessage.includes(w))) {
      return "The owner of this service platform is 'Nerdewave Team'.";
    }

    // Pricing request
    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "Prices vary based on the service type. For example:\n- Plumbing: ₹199 onwards\n- Electrician: ₹149 onwards\n- Cleaning: ₹299 onwards\n- Carpentry: ₹199 onwards\nYou can select a service for exact pricing.";
    }

    // Availability
    if (lowerMessage.includes("available") || lowerMessage.includes("time")) {
      return "Our experts are available from 8 AM to 10 PM. You can book any slot from the service page.";
    }

    // Suggest services
    if (
      lowerMessage.includes("recommend") ||
      lowerMessage.includes("service") ||
      lowerMessage.includes("suggest") ||
      lowerMessage.includes("help")
    ) {
      const category = Object.keys(services).find((cat) =>
        lowerMessage.includes(cat)
      );

      const suggestions = services[category] || services.all;

      return `Here are some ${
        category || "popular"
      } services:\n- ${suggestions.join("\n- ")}`;
    }

    // Problem-based auto detection
    if (lowerMessage.includes("water") || lowerMessage.includes("leak")) {
      return "Sounds like a plumbing issue. I can connect you with a plumber. Would you like to book one?";
    }

    if (
      lowerMessage.includes("fan") ||
      lowerMessage.includes("light") ||
      lowerMessage.includes("wiring")
    ) {
      return "This seems like an electrical problem. I can suggest an electrician for you.";
    }

    if (lowerMessage.includes("dirty") || lowerMessage.includes("clean")) {
      return "Looks like a cleaning service would help. Want suggestions?";
    }

    // Default catch-all
    return "I'm here to help you hire trusted plumbers, electricians, cleaners, and more. Tell me your problem and I’ll guide you to the right service!";
  };

  // Summary generator - you can repurpose this to show worker details or job summary
  const generateServiceSummary = async (service) => {
    setIsGeneratingSummary(true);
    try {
      const summary = await mockSummaryAPI(service);
      setCurrentBookSummary(summary);
      setShowSummaryModel(true);
    } catch (error) {
      toast.error("Failed to generate summary");
      console.error("Summary generation error:", error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  
  return (
    <>
      {/* AI Assistant Floating Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button
          onClick={() => setShowAIChat(!showAIChat)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center relative"
          aria-label="AI Assistant"
        >
          <RiRobot2Line size={24} />

          {!showAIChat && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center"
            >
              AI
            </motion.span>
          )}
        </button>
      </motion.div>

      {/* AI Chat Assistant Modal */}
      <AiChatBot
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        onSubmit={handleAIChatSubmit}
      />

      {/* HERO SECTION */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <img
          className="absolute inset-0 -z-10 w-full h-full object-cover rotate-3"
          src={bg}
          alt="Background"
        />

        {/* Gradient/Overlay Section */}
        <div className="absolute inset-0 w-[30%] md:w-[35%] -z-10"></div>

        {/* Content Container */}
        <div className="flex flex-col md:flex-row items-center justify-between w-[90%] mx-auto px-5 md:px-15 py-10 md:py-20 gap-10">
          {/* Left Content */}
          <div className="flex flex-col gap-5 text-center md:text-left md:w-1/2">
            <div className="bg-blue-100 py-2 px-5 rounded-full w-fit mx-auto md:mx-0">
              Trusted By Locals
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Hire the best local experts today
              </h1>
              <p className="text-sm sm:text-base md:text-lg">
                From electricians to cleaners, we connect you with the right
                expert quickly and hassle-free.
              </p>
            </div>

            <NavLink to="/expert">
              <div className="bg-blue-500 py-2.5 px-10 rounded-full w-fit text-white mx-auto md:mx-0 cursor-pointer hover:scale-105 transition">
                Get an Expert
              </div>
            </NavLink>
          </div>

          {/* Right Image */}
          <div className="hero-img w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              className="max-w-[80%] sm:max-w-[70%] md:max-w-full h-auto object-contain animate-float"
              src={heroimg}
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
