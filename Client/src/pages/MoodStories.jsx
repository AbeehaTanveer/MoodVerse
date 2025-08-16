// MoodCard.jsx
import { motion } from "framer-motion";

const moodStories = {
  Sad: "Others who felt sad found peace in Surah Ad-Duha",
  // Anxious: "Surah Al-Inshirah comforts those with anxiety",
  Forgiveness: "This state is perfect for reflecting on Surah Az-Zumar",
  Hopeless: "Surah Yusuf brings hope to the despairing",
  Angry: "The Prophet recommended saying 'A'udhu billahi min ash-shaytan ir-rajim' when angry",
  Grateful: "Surah An-Nahl reminds us of Allah's countless blessings",
  // Heartbroken: "Surah At-Tawbah healed broken hearts",
  // Happy: "Share your joy by giving thanks in sujood"
};

export const MoodCard = ({ mood, selectedMood, onClick }) => {
  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center ${
        selectedMood === mood.label
          ? "border-emerald-400 bg-emerald-50 shadow-md"
          : "border-gray-100 bg-white shadow-sm"
      } ${mood.color}`}
      onClick={onClick}
    >
      <span className="text-3xl mb-2">{mood.emoji}</span>
      <span className="font-medium text-gray-700">{mood.label}</span>
      <motion.p 
        initial={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        className="text-xs italic text-gray-500 mt-2 text-center"
      >
        {moodStories[mood.label]}
      </motion.p>
    </motion.button>
  );
};
export default MoodCard;