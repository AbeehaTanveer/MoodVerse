import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const QuranQuotePage = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  
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


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-[#f5f5f5] overflow-hidden">
      {/* Green animated sidebar */}
      <motion.div 
      className="w-1/3 bg-gradient-to-b from-emerald-600 via-emerald-500 to-emerald-400 relative"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-white/10"
          animate={{
            x: [0, 100, 0],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-10 left-10 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-serif mb-2">Quran Quotes</h2>
          <div className="w-16 h-1 bg-white mb-4"></div>
          <p className="text-sm opacity-80">Reflect upon these divine words</p>
        </motion.div>
      </motion.div>

      {/* Main content area */}
      <div className="w-2/3 flex items-center justify-center p-8">
        <motion.div
          key={currentQuote}
          className="text-center max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-4xl text-[#2e7d32] mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            ﷽
          </motion.div>
          
          <motion.p 
            className="text-3xl font-serif text-gray-800 leading-relaxed mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            "{quotes[currentQuote].text}"
          </motion.p>
          
         
          
          <motion.p 
            className="text-lg text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            — {quotes[currentQuote].reference}
          </motion.p>
          
          <motion.div 
            className="flex justify-center mt-8 space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {quotes.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${currentQuote === index ? 'bg-[#2e7d32]' : 'bg-gray-300'}`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentQuote(index)}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuranQuotePage;