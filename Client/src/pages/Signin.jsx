import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router';
import axios from 'axios';
import api from '../api/api';

function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!validate()) return;
    setIsSubmitting(true);
    
    const response = await api.post(`/signin`, {
      email: formData.email,
      password: formData.password
    });

    console.log('Signin successful:', response.data.user);
    localStorage.setItem('name', response.data.user.name);
    localStorage.setItem('id', response.data.user.id);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('email', response.data.user.email);
    // Store token and user data if needed
    window.location.href = '/';
    
  } catch (error) {
    console.error("Full error object:", error);
    
    if (error.response) {
      // Backend responded with an error status
      console.error("Backend error response:", error.response.data);
      setErrors({
        server: error.response.data.message || "Sign-in failed",
        ...(error.response.data.errors || {})
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      setErrors({ server: "No response from server. Please try again." });
    } else {
      // Something happened in setting up the request
      console.error("Request setup error:", error.message);
      setErrors({ server: "Request failed to setup. Please check your connection." });
    }
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="min-h-screen bg-[#f8f5f2] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiNlZGVkZWQiIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9zdmc+')] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Subtle floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0, x: Math.random() * 100 }}
            animate={{ 
              opacity: [0, 0.2, 0],
              y: [0, Math.random() * 80 - 40],
              x: [Math.random() * 100, Math.random() * 100 + 30]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 rounded-full bg-emerald-300/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Back link */}
      <motion.a 
        href="/"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="self-start mb-4 ml-4 text-emerald-700 hover:text-emerald-900 flex items-center text-sm font-medium absolute top-6 left-6"
      >
        <FiArrowLeft className="mr-1" />
        Back to Home
      </motion.a>

      {/* Sign-In Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50 relative z-10"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-serif font-medium text-emerald-900 mb-2"
          >
            Welcome Back
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-emerald-800/80"
          >
            Continue your mindful journey
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { name: 'email', icon: <FiMail className="text-emerald-600" />, type: 'email' },
            { name: 'password', icon: <FiLock className="text-emerald-600" />, type: 'password' }
          ].map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <label htmlFor={field.name} className="block text-sm font-medium text-emerald-900/80 mb-1 capitalize">
                {field.name}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {field.icon}
                </div>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/70 border ${
                    errors[field.name] ? 'border-rose-300' : 'border-emerald-200'
                  } text-emerald-900 placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent shadow-sm transition`}
                  placeholder={`Enter your ${field.name}`}
                />
              </div>
              {errors[field.name] && <p className="mt-1 text-sm text-rose-500">{errors[field.name]}</p>}
            </motion.div>
          ))}

    

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-3"
          >
            <motion.button
              whileHover={{ y: -2, boxShadow: '0 5px 15px rgba(16, 185, 129, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium text-white ${
                isSubmitting ? 'bg-emerald-400' : 'bg-emerald-600'
              } shadow-md transition-all flex items-center justify-center`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center text-sm text-emerald-800/70"
        >
          <p>New to MoodVerse?{' '}
            <Link to={"/signup"}>
            <a href="#" className="text-emerald-700 hover:text-emerald-900 font-medium transition-colors">
              Create Account
            </a>
            </Link>
          </p>
        </motion.div>
      </motion.div>

      {/* Inspirational quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-center text-emerald-900/60 italic max-w-md"
      >
        "Peace begins with a pause and a breath."
      </motion.div>
    </div>
  );
}


export default SignInPage;