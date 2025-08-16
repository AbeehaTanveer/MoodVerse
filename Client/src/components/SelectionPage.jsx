import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {  Link, NavLink, useNavigate } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi"; // Import journal icon

import MoodStories from "../pages/MoodStories";

const MoodSelectionPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();

const [islogged,setIsLogged] = useState(false); 



  useEffect(() => {
    // This code will only run once, after the initial render.
    const user = localStorage.getItem("email");
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []); // The empty array ensures this runs only on mount.

  
const handleClick = () => {
  if (selectedMood) {
    navigate("/ayat", { state: { mood: selectedMood } });
  }
};

  const moods = [
    { emoji: "😢", label: "Sad", color: "bg-blue-50 hover:bg-blue-100" },
    // { emoji: "😰", label: "Anxious", color: "bg-amber-50 hover:bg-amber-100" },
    { emoji: "😇", label: "Forgiveness", color: "bg-emerald-50 hover:bg-emerald-100" },
    // { emoji: "🥺", label: "Seeking Forgiveness", color: "bg-purple-50 hover:bg-purple-100" },
    { emoji: "😤", label: "Angry", color: "bg-red-50 hover:bg-red-100" },
    { emoji: "😍", label: "Grateful", color: "bg-green-50 hover:bg-green-100" },
    // { emoji: "😊", label: "Happy", color: "bg-yellow-50 hover:bg-yellow-100" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-beige-50 font-sans">
      {/* Subtle Islamic pattern backdrop */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2Q4YjlkOCIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiIC8+PC9zdmc+')]"></div>

      {/* Header */}
      <header className="pt-8 px-6 z-10 relative">
        <div className="flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-emerald-600"
          >
            MoodVerse
          </motion.h1>
          <NavLink to="/" className="text-sm font-medium text-emerald-600 hover:text-emerald-800 flex items-center">
            <p>← Back to Home</p>
          </NavLink>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Title Section */}
        <motion.section
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            How are you feeling today?
          </h2>
          <p className="text-lg text-gray-600">
            Choose a mood and discover the words of the Quran that speak to your heart.
          </p>
        </motion.section>

   
<Link to={islogged ? "/journal/list" : "/signin"} className="flex justify-center mb-8">

<div className="fixed bottom-6 right-6 z-50">
  <button
    className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg transition-transform duration-200 hover:scale-105"
    title="Open Journal"
    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
    >
    <FiBookOpen size={24} />
  </button>
</div>
      </Link>
  
        {/* Mood Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12"
        >
          {moods.map((mood) => (
            <MoodStories
              key={mood.label}
              mood={mood}
              selectedMood={selectedMood}
              onClick={() => setSelectedMood(mood.label)}
            />
          ))}
        </motion.section>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!selectedMood}
            onClick={handleClick}
            className={`px-8 py-3 rounded-full text-lg font-medium shadow-md transition-all ${
              selectedMood
                ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Reveal my Ayah
          </motion.button>
        </motion.div>
      </main>

      {/* Footer Ayah */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="pb-8 text-center text-gray-500 text-sm"
      >
        <p className="font-arabic text-lg mb-1">فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا</p>
        <p>"Indeed, with hardship comes ease" – Surah Ash-Sharh (94:6)</p>
      </motion.footer>
    </div>
  );
};

export default MoodSelectionPage;