import React from "react";
import plumber from "../assets/home-page/services-assets/plumbing.png";
import electrician from "../assets/home-page/services-assets/wallpainter.png";
import pest from "../assets/home-page/services-assets/housecleaning.png";
import houseclean from "../assets/home-page/services-assets/housecleaning.png";
import ac from "../assets/home-page/services-assets/acservicing.png";
import carpenter from "../assets/home-page/services-assets/carpenter.png";
import mover from "../assets/home-page/services-assets/mover.png";
import wallpainter from "../assets/home-page/services-assets/wallpainter.png";
import { useData } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const services = [
    { id: "1", img: plumber, title: "Plumbing" },
    { id: "2", img: electrician, title: "Electrician" },
    { id: "3", img: pest, title: "Pest control" },
    { id: "4", img: houseclean, title: "House Cleaning" },
    { id: "5", img: ac, title: "AC Servicing" },
    { id: "6", img: carpenter, title: "Carpenter" },
    { id: "7", img: mover, title: "Mover" },
    { id: "8", img: wallpainter, title: "Wall Painter" },
  ];

  const navigate = useNavigate();
  const { setData } = useData();

  const handleuserdata = (item) => {
    setData(item);
    navigate("/bookservice");
  };

  return (
    <section className="w-full py-16 bg-blue-50" id="services">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Services
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            We connect you with trusted professionals offering a wide range of
            services in your area. Here's what we offer:
          </p>
        </div>

        {/* Services Grid */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
          {services.map((item) => (
            <li
              key={item.id}
              onClick={() => handleuserdata(item)}
              className="flex flex-col items-center text-center p-4 cursor-pointer 
                         hover:text-blue-600 hover:scale-105 transition-all duration-300"
            >
              <div className="w-24 h-24 sm:w-40 sm:h-40 mb-3 flex items-center justify-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-gray-800 font-medium text-lg sm:text-xl">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
