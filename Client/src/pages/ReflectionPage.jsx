import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router";
import api from "../api/api";

const MyReflectionsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReflection, setNewReflection] = useState("");
const [reflections, setReflections] = useState([]);
const [isLoading, setIsLoading] = useState(true);

  
 
  const colors = [
    "bg-[#F8E8EE] border-[#F8E8EE]", // Soft pink
    "bg-[#E8F3F8] border-[#E8F3F8]", // Sky blue
    "bg-[#F0F7E8] border-[#F0F7E8]", // Mint green
    "bg-[#F9F3E8] border-[#F9F3E8]", // Warm beige
    "bg-[#E8E8F8] border-[#E8E8F8]", // Lavender
    "bg-[#E8F8F0] border-[#E8F8F0]", // Seafoam
  ];



  // Delete a reflection
  const handleDelete = (id) => {
    const updatedReflections = reflections.filter(ref => ref.id !== id);
    setReflections(updatedReflections);
  };

  const [text, setText] = useState('');
  

const handleCreate = async () => {
  if (!newReflection.trim()) return;

  // ✅ Get userId + token from localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  if (!token || !userId) {
    console.error("User not logged in — cannot create reflection");
    return;
  }

  const reflectionData = {
    text: newReflection,
    mood: "general", // optional, you can set based on user input
    userId,          // ✅ pass userId for backend
    date: new Date().toISOString(),
  };

  try {
    setIsLoading(true);
    await api.post("/reflections", reflectionData); // token sent automatically via interceptor
    setNewReflection('');
    await fetchReflections();
    setIsModalOpen(false);
  } catch (err) {
    console.error(
      "Failed to create reflection:",
      err.response?.data || err.message
    );
  } finally {
    setIsLoading(false);
  }
};

const fetchReflections = async () => {
  try {
    setIsLoading(true);

    const userId = localStorage.getItem("id");
    if (!userId) {
      console.error("No userId found in localStorage");
      setReflections([]);
      return;
    }

    // ✅ Pass userId in query string
    const res = await api.get(`/reflections?userId=${userId}`);
    console.log("Fetched reflections:", res.data);

    const data = res.data;

    if (Array.isArray(data)) {
      setReflections(data);
    } else if (Array.isArray(data.reflections)) {
      setReflections(data.reflections);
    } else {
      console.error("Invalid reflections data:", data);
      setReflections([]);
    }
  } catch (err) {
    console.error("Error fetching reflections:", err);
    setReflections([]);
  } finally {
    setIsLoading(false);
  }
};





useEffect(() => {
  fetchReflections();
}, []);

  // Get random rotation for sticky note effect
  const getRandomRotation = () => {
    return Math.floor(Math.random() * 5) - 2; // -2° to 2°
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f5ff] to-[#eef2ff] font-sans">
      {/* Subtle animated particles */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-300"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
            }}
            animate={{
              y: [null, (Math.random() * 100) + 100],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

  <header className="pt-8 px-6 z-10 relative">
        <div className="flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-emerald-600"
          >
            MoodVerse
          </motion.h1>
          <NavLink to="/selection" className="text-sm font-medium text-emerald-600 hover:text-emerald-800 flex items-center">
            <p>← Change Mood</p>
          </NavLink>
        </div>
      </header>
      {/* Header */}
      <div className="relative max-w-6xl mx-auto pt-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-emerald-700 mb-3">
            My Spiritual Reflections
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your personal journey through Quranic guidance
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block mt-6 px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
          >
            + Add New Reflection
          </button>
        </motion.div>
      </div>



      {/* Reflections Grid */}
<main className="relative max-w-6xl mx-auto px-6 pb-20">
  {isLoading ? (
    <div className="flex justify-center items-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent"
      />
    </div>
  ) : reflections.length === 0 ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-20"
    >
    
       <p className="text-xl text-gray-500 mb-6">
              No reflections yet. Your spiritual journey begins with a single thought...
            </p>
         
    </motion.div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         <AnimatePresence>
  {reflections.map((reflection, index) => (
    <motion.div
      key={reflection._id} // Changed from reflection.id to reflection._id
      layout
      initial={{ opacity: 0, y: 20, rotate: getRandomRotation() }}
      animate={{ opacity: 1, y: 0, rotate: getRandomRotation() }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", damping: 10 }}
      whileHover={{ y: -5, rotate: 0 }}
      className={`relative p-6 rounded-lg shadow-md ${
        colors[index % colors.length]
      }`}
      style={{
        transformOrigin: "top left",
        boxShadow: "0 4px 15px -5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Reflection Content */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="h-full flex flex-col"
      >
        <p className="text-gray-700 mb-4 flex-1 font-serif italic">
          "{reflection.text}"
        </p>
        <p className="text-xs text-gray-500 mt-auto">
          {new Date(reflection.date).toLocaleString([], {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </motion.div>

      {/* Hover Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute top-3 right-3 flex space-x-2"
      >
        <button
          onClick={() => handleDelete(reflection._id)} // Make sure this matches your backend ID
          className="w-8 h-8 flex items-center justify-center bg-white/80 rounded-full shadow-sm hover:bg-red-100 hover:text-red-500 transition-colors"
          aria-label="Delete reflection"
        >
          ✕
        </button>
      </motion.div>

      {/* Corner fold effect */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-white/30 to-transparent rounded-tr-lg" />
    </motion.div>
  ))}
</AnimatePresence>
    </div>
  )}
</main>


      {/* Add Reflection Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-serif text-emerald-700 mb-4">Add New Reflection</h2>
              
              <textarea
                value={newReflection}
                onChange={(e) => setNewReflection(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-4 mb-6 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows={6}
                placeholder="Write your spiritual reflection here..."
                autoFocus
              />
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
                  disabled={!newReflection.trim()}
                >
                  Add Reflection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative py-8 text-center text-gray-500 text-sm">
        <p className="font-arabic text-lg mb-1">وَذَكِّرْ فَإِنَّ الذِّكْرَى تَنْفَعُ الْمُؤْمِنِينَ</p>
        <p>"And remind, for indeed the reminder benefits the believers." (51:55)</p>
      </footer>
    </div>
  );
};

export default MyReflectionsPage;