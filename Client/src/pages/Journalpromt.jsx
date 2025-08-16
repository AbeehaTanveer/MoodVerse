// JournalPrompt.jsx
import { motion } from "framer-motion";
import { Link } from "react-router";

 const JournalPrompt = ({ journalText, setJournalText }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h3 className="text-xl font-light text-gray-700 mb-3">
        Write how you're feeling in this moment
      </h3>
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100">
        <textarea
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="I feel exhausted and overwhelmed because..."
          className="w-full min-h-[60px] bg-transparent focus:outline-none resize-none text-gray-700 placeholder-gray-400"
        />
        <div className="text-right text-xs text-gray-400">
          {journalText.length}/300
        </div>
      </div>
      <button className=""> Save Reflection</button>
      <Link to={"/journal/list"} className="ml-4">
      <button className="ml-8"> View List </button>
      </Link>
    </motion.div>
  );
};

export default JournalPrompt;
