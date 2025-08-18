import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";

const DuaSuggestionPage = ({ duaText, onSave, onBack }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);
  const [dua, setDua] = useState("");
const location = useLocation();
const selectedMood = location.state?.mood;
console.log("Location state:", location.state);







const duaDisplay = async () => {
  try {
    const response = await fetch("/data/dua.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();


    const moodKey = Object.keys(data).find(
      (key) => key.toLowerCase() === selectedMood?.toLowerCase()
    );
    console.log("Found moodKey:", moodKey); // Debug: Log the matched mood key

    if (moodKey && Array.isArray(data[moodKey]) && data[moodKey].length > 0) {
      const moodDuas = data[moodKey];
      console.log("Mood duas:", moodDuas); // Debug: Log the array of duas for the mood
      const randomDua = moodDuas[Math.floor(Math.random() * moodDuas.length)];
      console.log("Selected dua:", randomDua); // Debug: Log the selected dua
      setDua(randomDua.translation); // Set the translation field to dua state
    } else {
      console.warn("No matching duas found for mood:", selectedMood);
      setDua("No dua found for this mood.");
    }
  } catch (err) {
    console.error("Failed to fetch duas:", err);
    setDua("Error loading dua. Please try again.");
  }
};
  
    useEffect(() => {
      duaDisplay();
    }, []);

  const handleSave = () => {
    if (!isSaved) {
      setIsSaved(true);
      setShowSavedIndicator(true);
      onSave(duaText);
      setTimeout(() => setShowSavedIndicator(false), 2000);
    }
  };

  return (
 <div className="min-h-screen bg-[#f5f5f5] overflow-hidden relative" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-white/30 pointer-events-none"></div>

      {/* Main content container */}
      <div className="max-w-2xl mx-auto px-6 py-12 relative z-10">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-serif text-[#2e7d32] mb-4"
          >
       Today's dua for your heart.
          </motion.h2>
          <div className="w-24 h-1 bg-[#81c784] mx-auto rounded-full"></div>
        </motion.div>

        {/* Dua Display */}
        {dua ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#e8f5e9] rounded-2xl -z-10" />
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-[#e8f5e9]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-center"
              >
                <span className="text-3xl text-[#81c784] mb-4 inline-block">🕊️</span>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="text-xl md:text-2xl font-serif text-gray-700 leading-relaxed italic"
                >
                  {dua}
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <p className="text-center text-gray-500">Loading dua...</p>
        )}

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-center mt-10 relative"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={isSaved}
            className={`p-4 rounded-full ${isSaved ? "text-gray-400" : "text-[#e57373] hover:text-[#ef5350]"}`}
            aria-label={isSaved ? "Dua saved" : "Save this dua"}
          >
            <motion.div
              animate={{
                scale: isSaved ? [1, 1.2, 1] : 1,
                textShadow: isSaved 
                  ? "0 0 8px rgba(239, 83, 80, 0.5)" 
                  : showSavedIndicator 
                    ? "0 0 15px rgba(239, 83, 80, 0.7)" 
                    : "0 0 0px rgba(239, 83, 80, 0)"
              }}
              transition={{ duration: 0.3 }}
            >
              {isSaved ? (
                <span className="text-3xl">❤️</span>
              ) : (
                <span className="text-3xl">🤍</span>
              )}
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {showSavedIndicator && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: -20 }}
                exit={{ opacity: 0, y: -30 }}
                className="absolute top-0 bg-[#81c784] text-white px-3 py-1 rounded-full text-sm"
              >
                Saved!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 py-6 text-center"
      >
        <div className="flex justify-center space-x-4 mb-4">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="px-6 py-2 bg-[#e8f5e9] text-[#2e7d32] rounded-full hover:bg-[#c8e6c9] transition-colors"
            >
              Back to Home
            </motion.button>
          </Link>
        
        </div>
        <p className="text-gray-500 text-sm italic">
          "Indeed, in the remembrance of Allah do hearts find rest." — Qur'an 13:28
        </p>
      </motion.footer>
    </div>
  );
};

// Example usage:
<DuaSuggestionPage 
  duaText="O Allah, grant me strength when I am weak, hope when I am down, and faith when I am lost."
  onSave={(dua) => console.log('Saving dua:', dua)}
  onBack={() => navigate('/')}
/>

export default DuaSuggestionPage;