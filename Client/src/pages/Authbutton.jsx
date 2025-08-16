import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const AuthButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userName = localStorage.getItem("name");
  const firstLetter = userName?.charAt(0).toUpperCase();
const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  if (userName) {
    return (
      <div className="relative ml-28">
        {/* Clickable Avatar */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Holographic Avatar with Particle Effect */}
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden border-2 border-emerald-400/50"
            animate={{
              boxShadow: isOpen 
                ? ["0 0 15px rgba(74, 222, 128, 0.7)", "0 0 20px rgba(74, 222, 128, 0.9)", "0 0 15px rgba(74, 222, 128, 0.7)"]
                : "0 0 10px rgba(74, 222, 128, 0.3)",
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            {/* Avatar Letter */}
            <span className="text-emerald-400 font-bold text-lg z-10">{firstLetter}</span>
            
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-emerald-400/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            />
            
            {/* Floating Particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                initial={{
                  x: Math.random() * 16 - 8,
                  y: Math.random() * 16 - 8,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * 20 - 10,
                  y: Math.random() * 20 - 10,
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </motion.div>

          {/* Username with typing effect */}
          <motion.div className="overflow-hidden">
            <motion.p 
              className="text-emerald-800 text-sm font-mono"
              initial={{ opacity: 0, x: -5 }}
              animate={{
                opacity: isOpen ? 0.9 : 0.7,
                x: 0
              }}
              transition={{ duration: 0.3 }}
            >
              {userName.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl z-50 border border-emerald-400/20 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Header */}
              <div className="px-4 py-3 border-b border-emerald-400/10">
                <p className="text-emerald-400 text-sm font-mono">Logged in as</p>
                <p className="text-white font-medium truncate">{userName}</p>
              </div>
              
              <div className="p-1">
                {/* Menu Item 1 */}

                
                {/* Logout Button */}
                <div className="border-t border-emerald-400/10 mt-1">
                  <motion.button
                    onClick={() => {
                      localStorage.removeItem("name");
                      localStorage.removeItem("email");
                      localStorage.removeItem("token");
                      localStorage.removeItem("id");
                      window.location.reload();
                    }}
                    className="w-full px-4 py-3 text-left text-rose-400 hover:bg-rose-900/20 transition-all flex items-center justify-between group"
                    whileHover={{ x: 3 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.span
                        animate={{ 
                          rotate: [0, 20, 0],
                          transition: { duration: 1.5, repeat: Infinity }
                        }}
                      >
                        🚪
                      </motion.span>
                      <span>Sign Out</span>
                    </div>
                    <motion.span
                      className="opacity-0 group-hover:opacity-100"
                      animate={{ 
                        x: [0, 2, 0],
                        transition: { repeat: Infinity, duration: 1.5 }
                      }}
                    >
                      ↗
                    </motion.span>
                  </motion.button>
                </div>
              </div>
              
              {/* Menu Footer */}
              <div className="px-4 py-2 text-xs text-center text-emerald-400/50 border-t border-emerald-400/10">
               {new Date().getFullYear()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click outside to close */}
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    );
  }

  // Login Button
  return (
    <Link to="/signin">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500/90 to-emerald-600 text-white font-medium shadow-lg transition-all relative overflow-hidden group"
      >
        {/* Main Content */}
        <span className="relative z-10 flex items-center">
          <motion.span
            className="mr-2"
            animate={{
              rotate: [0, 10, -10, 0],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            ⚡
          </motion.span>
          ACCESS
        </span>
        
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
        />
        
        {/* Sparkle Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
            initial={{
              x: Math.random() * 40 - 20,
              y: Math.random() * 10 - 5,
              opacity: 0
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0, 0.8, 0],
              transition: {
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                delay: i * 0.3
              }
            }}
          />
        ))}
        
        {/* Border Animation */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-transparent pointer-events-none"
          initial={{ borderColor: "rgba(74, 222, 128, 0)" }}
          whileHover={{
            borderColor: "rgba(74, 222, 128, 0.3)",
            transition: { duration: 0.3 }
          }}
        />
      </motion.button>
    </Link>
  );
};

export default AuthButton;