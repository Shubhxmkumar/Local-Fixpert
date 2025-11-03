import React from "react";
import about from "../assets/home-page/About-gradient.png";

const About = () => {
  return (
    <section
      className="relative w-full h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-start text-gray-800"
      style={{ backgroundImage: `url(${about})` }}
    >
      {/* Left Gradient Overlay */}
      <div className="absolute left-0 top-0 h-full w-full md:w-[50%] bg-gradient-to-r from-yellow-50/95 via-yellow-50/70 to-transparent"></div>

      {/* Text Content */}
      <div className="relative z-10 w-full md:w-[45%] px-6 sm:px-10 md:pl-20 py-10 text-gray-800">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight poppins-bold">
          About <span className="text-blue-600">Local Fixperts</span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 text-gray-700">
          Local Fixperts is a platform that connects you with trusted local
          experts for everyday services like plumbing, electrical work,
          appliance repair, and more.
          <br />
          <br />
          Our mission is to make it easy to find reliable help nearby while
          supporting the local workforce. Whether you need a quick fix or
          long-term service, we bring skilled professionals to your doorstep —
          safely, quickly, and transparently.
        </p>

        <button className="mt-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default About;
