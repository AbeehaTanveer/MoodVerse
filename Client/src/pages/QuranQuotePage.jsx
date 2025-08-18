import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
  import { GoHome } from "react-icons/go";

const QuranQuotePage = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
const quotes = [
  {
    text: "Indeed, with hardship comes ease",
    reference: "Ash-Sharh 94:6",
  },
  {
    text: "So remember Me; I will remember you",
    reference: "Al-Baqarah 2:152",
  },
  {
    text: "And He found you lost and guided you",
    reference: "Ad-Duhaa 93:7",
  },
  {
    text: "Indeed, Allah is with the patient",
    reference: "Al-Baqarah 2:153",
  },
  {
    text: "Call upon Me; I will respond to you",
    reference: "Ghafir 40:60",
  },
  {
    text: "Indeed, Allah loves those who rely upon Him",
    reference: "Aal-e-Imran 3:159",
  },
  {
    text: "And He is with you wherever you are",
    reference: "Al-Hadid 57:4",
  },
  {
    text: "And Allah loves the doers of good",
    reference: "Aal-e-Imran 3:134",
  },
  {
    text: "Indeed, Allah does not burden a soul beyond that it can bear",
    reference: "Al-Baqarah 2:286",
  },
  {
    text: "So be patient. Indeed, the promise of Allah is truth",
    reference: "Ar-Rum 30:60",
  },
  {
    text: "Indeed, Allah is Forgiving and Merciful",
    reference: "An-Nisa 4:96",
  },
  {
    text: "And rely upon Allah; and sufficient is Allah as Disposer of affairs",
    reference: "Al-Ahzab 33:3",
  },
  {
    text: "Indeed, my Lord is near and responsive",
    reference: "Hud 11:61",
  },
  {
    text: "Do not despair of the mercy of Allah",
    reference: "Az-Zumar 39:53",
  },
  {
    text: "And We have certainly made the Qur'an easy for remembrance",
    reference: "Al-Qamar 54:17",
  },
  {
    text: "Indeed, prayer prohibits immorality and wrongdoing",
    reference: "Al-Ankabut 29:45",
  },
  {
    text: "Verily, in the remembrance of Allah do hearts find rest",
    reference: "Ar-Ra’d 13:28",
  },
  {
    text: "Indeed, Allah loves those who repent",
    reference: "Al-Baqarah 2:222",
  },
  {
    text: "And your Lord is going to give you, and you will be satisfied",
    reference: "Ad-Duhaa 93:5",
  },
  {
    text: "So be mindful of Allah and He will teach you",
    reference: "Al-Baqarah 2:282",
  },
  {
    text: "And He is the best of providers",
    reference: "Al-Hajj 22:58",
  },
  {
    text: "And We have certainly honored the children of Adam",
    reference: "Al-Isra 17:70",
  },
  {
    text: "Indeed, Allah loves those who put their trust in Him",
    reference: "Aal-e-Imran 3:159",
  }
];

  const getRandomQuote = () => {
    const newIndex = Math.floor(Math.random() * quotes.length);
    if (newIndex === currentQuote) {
      return getRandomQuote(); // Ensure we get a different quote
    }
    return newIndex;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentQuote(getRandomQuote());
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div className="flex h-screen bg-[#f5f5f5] overflow-hidden font-sans">
      {/* Futuristic animated sidebar */}
      <motion.div 
        className="w-1/3 bg-gradient-to-br from-emerald-600 to-emerald-400 relative overflow-hidden"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Geometric pattern background */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Floating orb */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-4xl font-light mb-4 tracking-wider">QURANIC WISDOM</h2>
            <div className="w-24 h-1 bg-white/50 mb-6"></div>
            <p className="text-sm opacity-80 tracking-wider">DIVINE WORDS FOR THE MODERN SOUL</p>
          </motion.div>
          
          <motion.div
            className="text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="text-xs opacity-60 mb-2">SWIPE FOR MORE</p>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
       

      {/* Main content area - Futuristic design */}
      <div className="w-2/3 flex items-center justify-center p-8 relative">
        {/* Background grid */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2Q4YjlkOCIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiIC8+PC9zdmc+')]"></div>
        

<Link to="/">
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg transition-transform duration-200 hover:scale-105"
            title="Open Journal"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            >
   
     <GoHome />


          </button>
        </div>
              </Link>
        <motion.div
          key={currentQuote}
          className="text-center max-w-2xl relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {/* Futuristic Bismillah */}
          <motion.div
            className="text-5xl text-emerald-600 mb-8"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity 
            }}
          >
            ﷽
          </motion.div>
          
          {/* Quote with modern typography */}
          <motion.div
            className="relative"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute -left-8 top-0 h-full w-1 bg-emerald-400/30"></div>
            <motion.p 
              className="text-4xl font-light text-gray-800 leading-relaxed mb-8 tracking-tight"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
            >
              <span className="text-emerald-600/80">"</span>
              {quotes[currentQuote].text}
              <span className="text-emerald-600/80">"</span>
            </motion.p>
          </motion.div>
          
          {/* Modern reference */}
          <motion.div 
            className="inline-block px-6 py-3 bg-emerald-600/10 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-sm tracking-wider text-emerald-700 font-medium">
              {quotes[currentQuote].reference}
            </p>
          </motion.div>
          
          {/* Futuristic navigation dots */}
          <motion.div 
            className="flex justify-center mt-12 space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {quotes.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  currentQuote === index ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.5 }}
                onClick={() => setCurrentQuote(index)}
                animate={{
                  y: currentQuote === index ? [-3, 3, -3] : 0,
                  opacity: currentQuote === index ? 1 : 0.6
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}
          </motion.div>
          
          {/* Progress indicator */}
          <motion.div 
            className="mt-8 h-1 bg-gray-200 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <div className="h-full bg-emerald-500"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuranQuotePage;