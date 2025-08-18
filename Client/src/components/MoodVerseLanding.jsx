import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, Links } from 'react-router';
import AuthButton from '../pages/Authbutton';

const MoodVerseLanding = () => {
  const moods = [
    { emoji: '😢', name: 'Sad', color: 'from-blue-100 to-indigo-100' },
    { emoji: '😇', name: 'Grateful', color: 'from-emerald-100 to-teal-100' },
    { emoji: '😰', name: 'Anxious', color: 'from-amber-100 to-orange-100' },
    { emoji: '😍', name: 'Loving', color: 'from-rose-100 to-pink-100' },
    { emoji: '😤', name: 'Angry', color: 'from-red-100 to-rose-100' },
  ];

  const features = [
    {
      icon: '🌙',
      title: 'Divine Connection',
      description: 'Bridge your emotions with eternal wisdom'
    },
    {
      icon: '💖',
      title: 'Emotional Healing',
      description: 'Find verses that speak directly to your heart'
    },
    {
      icon: '📱',
      title: 'Modern Interface',
      description: 'Beautiful design for peaceful reflection'
    }
  ];

  return (
    <>
      <Helmet>
        <title>MoodVerse | Quranic Guidance for Every Emotion</title>
        <meta name="description" content="Find peace in the words of the Quran based on your current mood" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
        {/* Navigation */}
        <nav className="py-6 px-4 md:px-8 lg:px-16">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center"
            >
              <span className="text-3xl font-bold text-emerald-600">MoodVerse</span>
            </motion.div>
       <AuthButton/>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <Container>
            <Row className="items-center">
              <Col lg={6} className="mb-10 lg:mb-0">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
                    Divine Guidance for <span className="text-emerald-600">Every Emotion</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 mb-8">
                    Connect your heart with Quranic wisdom tailored to your current state
                  </p>
                    {/* Explore Your Mood */}


                  <div className="flex space-x-4">
                    <Link to="/selection" className="text-emerald-600 hover:text-emerald-800 font-medium text-lg">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-full bg-emerald-600 text-white text-lg font-medium shadow-lg hover:shadow-emerald-200 transition-all"
                      >
                      Begin Journey

                    </motion.button>
                      </Link>
                      <Link to="/qoute">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-full border-2 border-emerald-600 text-emerald-600 text-lg font-medium hover:bg-emerald-50 transition-all"
                      >
                   Quran Quotes
                    </motion.button>
                        </Link>
                  </div>
                </motion.div>
              </Col>
              <Col lg={6}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-100 rounded-full opacity-70 blur-xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-100 rounded-full opacity-70 blur-xl"></div>
                  <Card className="relative overflow-hidden border-0 shadow-xl rounded-2xl">
                    <Card.Body className="p-8 text-center">
                      <h3 className="text-2xl font-semibold text-gray-700 mb-6">How are you feeling today?</h3>
                      <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {moods.map((mood, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex flex-col items-center cursor-pointer"
                          >
                            <div className={`text-4xl bg-gradient-to-br ${mood.color} p-4 rounded-2xl shadow-sm hover:shadow-md transition-all w-20 h-20 flex items-center justify-center`}>
                              {mood.emoji}
                            </div>
                            <span className="mt-2 text-sm font-medium text-gray-600">{mood.name}</span>
                          </motion.div>
                        ))}
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-6">
                        <p className="text-right text-2xl font-arabic mb-3">وَذَكِّرْ فَإِنَّ ٱلذِّكْرَىٰ تَنفَعُ ٱلْمُؤْمِنِينَ</p>
                        <p className="text-gray-600">"And remind, for indeed the reminder benefits the believers." (51:55)</p>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <Container>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Spiritual Healing Through Quran</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Experience the Quran in a way that resonates with your heart's current state</p>
            </motion.div>

            <Row className="justify-center">
              {features.map((feature, index) => (
                <Col md={4} key={index} className="mb-8 md:mb-0">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="text-center px-4"
                  >
                    <div className="text-5xl mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

  
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-500">
          <Container>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto text-white"
            >
              <div className="text-5xl mb-6">﴾﴿</div>
              <p className="text-2xl md:text-3xl font-arabic mb-8 leading-relaxed">
          حُطَـٰمًا ۚ إِنَّ فِى ذَٰلِكَ لَذِكْرَىٰ لِأُو۟لِى ٱلْأَلْبَـٰبِ
              </p>
              <p className="text-lg">
              Indeed, in that is a reminder for people of understanding. (Surah Az-Zumar 21)
              </p>
            </motion.div>
          </Container>
        </section>
        <section className="py-20 bg-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Ready to Begin Your Reflection?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Discover Quranic verses that speak directly to your current emotional state.
              </p>
              <Link to="/selection">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-emerald-600 text-white text-lg font-medium shadow-lg hover:shadow-emerald-200 transition-all"
              >
                Find Your Verse Now
              </motion.button>
              </Link>
            </motion.div>
          </Container>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-50">
          <Container>
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-emerald-600 mb-2">MoodVerse</h3>
                <p className="text-gray-600">Quranic guidance for every emotion</p>
              </motion.div>
              <div className="flex justify-center space-x-6 mb-8">
                
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://github.com/AbeehaTanveer"
                  className="text-gray-500 hover:text-emerald-600"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://www.linkedin.com/in/abeeha-zainab-363643268/"
                  className="text-gray-500 hover:text-emerald-600"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              </div>
              <div className="text-gray-500 text-sm">
                <p>Built with ❤️ by Abeeha Zainab</p>
                {/* <p className="mt-2">Powered by Quran API</p> */}
              </div>
            </div>
          </Container>
        </footer>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Poppins', sans-serif;
        }
        .font-arabic {
          font-family: 'Noto Naskh Arabic', serif;
          direction: rtl;
          font-size: 1.8rem;
          line-height: 2.5rem;
        }
      `}</style>
    </>
  );
};

export default MoodVerseLanding;