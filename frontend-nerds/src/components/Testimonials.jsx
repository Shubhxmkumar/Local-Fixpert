import { motion } from "framer-motion";
import { useState } from "react";

export default function Testimonials() {
  const [websiteratingList] = useState([
    {
      author: "Aditi Sharma",
      reviewText:
        "I booked my repair through this site and the whole process felt smoother than my morning chai. Fast, clear, and actually helpful."
    },
    {
      author: "Rohan Patel",
      reviewText:
        "Finding the right expert used to be a headache. This platform turned that storm into a drizzle. Booked, fixed, done."
    },
    {
      author: "Kavya Desai",
      reviewText:
        "The service felt friendly and professional at the same time. I got updates, reminders, and no surprise charges."
    },
    {
      author: "Arjun Mehta",
      reviewText:
        "The technician reached on time, did quality work, and didn’t try to upsell me random nonsense. Loved it."
    },
    {
      author: "Sneha Verma",
      reviewText:
        "I’m always nervous about booking things online, but this site felt trustworthy from the first click. Clean UI, quick support, and a great repair."
    },
    {
      author: "Priya Nair",
      reviewText:
        "My laptop was almost ready to throw itself into the sun, but the expert fixed it in under an hour. I’m impressed."
    }
  ]);

  return (
    <div className="container mx-auto my-15">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Real experiences from people who used our service.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {websiteratingList.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-4">
                {item.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{item.author}</h4>
                <p className="text-sm text-gray-600">Customer</p>
              </div>
            </div>

            <div className="flex items-center mt-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-gray-700 mt-6">{item.reviewText}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
