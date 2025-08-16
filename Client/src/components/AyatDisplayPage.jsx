import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api, { likeComment } from "../api/api"; // Adjust the import based on your API setup

const AyahDisplayPage = () => {
  const location = useLocation();
  const selectedMood = location.state?.mood;
  const navigate = useNavigate();
  const handleClick = () => {
  if (selectedMood) {
    navigate("/dua", { state: { mood: selectedMood } });
  }
};

  

  // State for comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [ayah, setAyah] = useState();
  const name = localStorage.getItem("name");

const userId = localStorage.getItem("id"); // assuming you store user here
const [user, setUser] = useState({ name: name ? name : "Anonymous" });


const toggleLike = async (commentId) => {
  if (!userId) {
    alert("Please log in to like comments.");
    return;
  }

  setComments((prevComments) =>
    prevComments.map((comment) => {
      if (comment._id === commentId) {
        const alreadyLiked = comment.likes.includes(userId);

        const updatedLikes = alreadyLiked
          ? comment.likes.filter((id) => id !== userId)
          : [...comment.likes, userId];

        return {
          ...comment,
          likes: updatedLikes,
          liked: !alreadyLiked, // toggle like status instantly
        };
      }
      return comment;
    })
  );

  try {
    await likeComment(commentId, userId); // send request in background
  } catch (err) {
    // Revert state if error
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id === commentId) {
          const alreadyLiked = comment.likes.includes(userId);
          const revertedLikes = alreadyLiked
            ? comment.likes.filter((id) => id !== userId)
            : [...comment.likes, userId];

          return {
            ...comment,
            likes: revertedLikes,
            liked: alreadyLiked,
          };
        }
        return comment;
      })
    );

    alert(err.response?.data?.message || "Error liking comment.");
  }
};


  const handleSubmitComment = async () => {
    try {
      const response = await api.post("/comments", {
        author: user.name,
        text: newComment,
        mood: selectedMood || "general",
      });

      if (response.status === 201) {
        const newCommentData = response.data.comment;

        // Add the new comment to the top of the list
        setComments((prevComments) => [newCommentData, ...prevComments]);

        setNewComment("");
      }
    } catch (error) {
      console.error(
        "Failed to post comment:",
        error.response?.data || error.message
      );
    }
  };

  const fetchComments = async (mood) => {
    if (!mood) return;

    try {
      const response = await api.get(`/comments?mood=${mood}`);
      console.log("Fetched comments:", response.data.comments);
      setComments(response.data.comments);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    if (selectedMood) {
      fetchComments(selectedMood);
    }
  }, [selectedMood]);

  const ayatDisplayy = async () => {
    try {
      const response = await fetch("/data/ayat.json");
      const data = await response.json();

      const moodKey = Object.keys(data).find(
        (key) => key.toLowerCase() === selectedMood?.toLowerCase()
      );

      if (moodKey && Array.isArray(data[moodKey])) {
        const moodAyahs = data[moodKey];
        const randomAyah =
          moodAyahs[Math.floor(Math.random() * moodAyahs.length)];
        setAyah(randomAyah);
      } else {
        console.warn("No matching ayahs found for mood:", selectedMood);
        setAyah(null); // Optional: handle no results gracefully
      }
    } catch (err) {
      console.error("Failed to fetch ayahs:", err);
    }
  };

  useEffect(() => {
    ayatDisplayy();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", damping: 10 },
    },
  };

  const commentVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };



  return (
    <>
      <Helmet>
        <title>Your Quranic Reflection | MoodVerse</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&family=Poppins:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 font-poppins relative overflow-hidden">
        {/* Subtle Islamic pattern backdrop */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2Q4YjlkOCIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiIC8+PC9zdmc+')]"></div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-6 px-6 absolute top-0 left-0 right-0"
        >
          <div className="flex justify-between items-center">
            <Link
              to="/selection"
              className="text-emerald-600 hover:text-emerald-800 flex items-center"
            >
              ← Change Mood
            </Link>
            <span className="text-xl font-bold text-emerald-600">
              MoodVerse
            </span>
          </div>
        </motion.header>

        {/* Main Content */}
        <Container className="min-h-screen flex flex-col justify-center py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            {/* Mood Indicator */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                Peaceful Reflection
              </span>
            </motion.div>
            {ayah ? (
              <>
                {/* Ayah Card */}
                <motion.div
                  variants={cardVariants}
                  className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 max-w-3xl mx-auto mb-8"
                  whileHover={{
                    boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1)",
                  }}
                >
                  {/* Arabic Ayah */}
                  <motion.div variants={itemVariants}>
                    <p className="font-arabic text-3xl md:text-4xl leading-loose text-gray-800 mb-8">
                      {ayah.arabic}
                    </p>
                  </motion.div>

                  {/* Translation */}
                  <motion.div variants={itemVariants}>
                    <p className="text-lg md:text-xl text-gray-700 italic mb-4">
                      "{ayah.translation}"
                    </p>
                    <p className="text-teal-600 font-medium">{ayah.reference}</p>
                  </motion.div>
                </motion.div>

                {/* Tafsir */}
                <motion.div
                  variants={itemVariants}
                  className="max-w-2xl mx-auto mb-12"
                >
                  <div className="bg-amber-50/50 p-4 rounded-lg border-l-4 border-amber-300">
                    <p className="text-gray-700">{ayah.tafsir}</p>
                  </div>


                </motion.div>
              </>
            ) : (
              <div className="flex items-center justify-center h-40">
                <motion.div
                  className="text-center text-green-600 text-lg font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    y: [10, 0, 10],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Loading Ayah...
                </motion.div>
              </div>
            )}

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <div onClick={handleClick} className="z-10">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition-colors"
                >
                  Show Dua
                </motion.button>
              </div>
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCommentSection(!showCommentSection)}
                className="px-6 py-3 z-10 bg-white border border-emerald-600 text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors"
              >
                {showCommentSection ? "Hide Reflections" : "Show Reflections"}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Comments Section */}
          <AnimatePresence>
            {showCommentSection && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="w-[900px] mx-auto bg-white rounded-t-3xl shadow-lg border border-gray-200  overflow-hidden z-50"
              >
                {/* Comment Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800 ">
                    Reflections ({comments.length})
                  </h3>
                  <button
                    onClick={() => setShowCommentSection(false)}
                    className="p-2 rounded-full hover:bg-gray-100 z-10 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {name ? (
                  <>
                    {/* Comment Input */}
                    <div className="p-4 border-b border-gray-100 ">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                          😊
                        </div>
                        <div className="flex-1">
                          <div className="relative z-50">
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Share your reflection..."
                              className="w-full p-3 rounded-xl border border-gray-200 focus:border-emerald-300 focus:ring-1 focus:ring-emerald-200 transition-all resize-none"
                              rows="2"
                            />
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-gray-500">
                                {newComment.length}/200
                              </span>
                              <button
                                onKeyPress={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault(); // prevent newline on Enter
                                    handleSubmitComment(); // trigger your submit
                                  }
                                }}
                                onClick={handleSubmitComment}
                                disabled={!newComment.trim()}
                                className={`px-4 py-1 rounded-full text-sm ${
                                  newComment.trim()
                                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                              >
                                Post
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p> </p>
                )}

           {/* Comments List */}
<div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto z-50">
  {comments.length === 0 ? (
    <p className="p-4 text-gray-500 text-center">No comments yet.</p>
  ) : (
    comments.map((comment) => (
      <motion.div
        key={comment._id}
        variants={commentVariants}
        className="p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex space-x-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            {comment.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <p className="font-medium text-gray-800 truncate">
                {comment.author}
              </p>
              <span className="text-xs text-gray-500">
                {comment.timestamp}
              </span>
            </div>
            <p className="text-gray-700 mt-1">{comment.text}</p>
            <div className="flex items-center mt-2 space-x-4">
              <button
                onClick={() => toggleLike(comment._id)}
                className={`flex items-center space-x-1 text-sm ${
                  comment.liked ? "text-emerald-500" : "text-gray-500"
                }`}
              >
                <span>❤️</span>
                <span>{comment.likes?.length || 0}</span>
              </button>
              {/* <button className="text-gray-500 text-sm">Reply</button> */}
            </div>
          </div>
        </div>
      </motion.div>
    ))
  )}
</div>

              </motion.section>
            )}
          </AnimatePresence>
        </Container>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pb-8 text-center text-gray-500 text-sm"
        >
          <p className="font-arabic text-lg mb-1">
            هَـٰذَا ذِكْرٌۭ لِّمَن كَانَ لَهُۥ قَلْبٌ
          </p>
          <p>"This is a reminder for those who reflect" – Az-Zumar (39:21)</p>
        </motion.footer>
      </div>

      <style jsx global>{`
        .font-arabic {
          font-family: "Noto Naskh Arabic", serif;
          direction: rtl;
          line-height: 2.5rem;
        }
        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
};

export default AyahDisplayPage;
