import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import api from '../api/api'; // Adjust the import path as needed
 function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if(!validate()) return;
      setIsSubmitting(true);
  const response=  await api.post('/signup', formData);
      console.log(response.data);
      
      // Store user data if needed
      localStorage.setItem('name', response.data.user.name);
      localStorage.setItem('id', response.data.user.id);
      localStorage.setItem('email', response.data.user.email);
   localStorage.setItem("token", response.data.token);
      
      // Handle successful signup (you might want to redirect here)
      window.location.href = '/';
      
    } catch (error) {
      console.error("Error during signup:", error);
      setErrors({ server: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#f8f5f2] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiNlZGVkZWQiIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9zdmc+')] flex flex-col items-center justify-center p-6">
      {/* Subtle floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0, x: Math.random() * 100 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: [0, Math.random() * 100 - 50],
              x: [Math.random() * 100, Math.random() * 100 + 50]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 rounded-full bg-emerald-300"
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
        className="self-start mb-4 ml-4 text-emerald-700 hover:text-emerald-900 flex items-center text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </motion.a>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-serif font-medium text-emerald-900 mb-2"
          >
            Begin Your Journey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-emerald-800/80"
          >
            Create your MoodVerse account
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['name', 'email', 'password', 'confirmPassword'].map((field, i) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <label htmlFor={field} className="block text-sm font-medium text-emerald-900/80 mb-1 capitalize">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type={field.includes('password') ? 'password' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/70 border ${
                  errors[field] ? 'border-rose-300' : 'border-emerald-200'
                } text-emerald-900 placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent shadow-sm transition`}
                placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}`}
              />
              {errors[field] && <p className="mt-1 text-sm text-rose-500">{errors[field]}</p>}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
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
                  Creating Account...
                </>
              ) : (
                <>
                  <motion.span 
                    animate={!isSubmitting ? { 
                      scale: [1, 1.05, 1],
                      transition: { repeat: Infinity, duration: 2 } 
                    } : {}}
                  >
                    Create Account
                  </motion.span>
                </>
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center text-sm text-emerald-800/70"
        >
          <p>Already have an account?{' '}
            <Link to={'/signin'}>
            <a href="#" className="text-emerald-700 hover:text-emerald-900 font-medium transition-colors">
              Sign In
            </a>
            </Link>
          </p>
        </motion.div>
      </motion.div>

      {/* Inspirational quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-8 text-center text-emerald-900/60 italic max-w-md"
      >
        "Begin your journey to self-awareness — one reflection at a time."
      </motion.div>
    </div>
  );
}

export default SignupPage