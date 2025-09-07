'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, CheckCircle, AtSign } from 'lucide-react';
import { signUpWithEmail } from '../lib/auth';
import './SignupForm.css';    // Moving border CSS
import './StarsBackground.css';  // Star animation CSS

export default function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState(''); // State for the user's full name
  const [username, setUsername] = useState(''); // This will now be treated as the nickname
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Client-Side Validation
    if (!fullName || !username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // CORRECTED: Passing all four arguments to the Supabase auth function
      await signUpWithEmail(email, password, fullName, username);
      setSuccess(`Welcome, ${fullName}! Your account is ready. Please check your mail for confiramtion`);
      
      setTimeout(() => {
        // CORRECTED: The redirect path should be '/dashboard', not the full file path.
        router.push('/dashboard');
      }, 2500);

    } catch (err) {
      // --- Enhanced Error Handling ---
      const errorMessage = err.message;

      if (errorMessage.includes('Nickname already exists')) {
        setError('This nickname is already taken. Please choose another.');
      } else if (errorMessage.includes('uppercase letter')) {
        setError('Password must contain at least one uppercase letter.');
      } else if (errorMessage.includes('special character')) {
        setError('Password must contain at least one special character.');
      } else if (errorMessage.includes('cannot contain "$" or "*"')) {
        setError('Password cannot contain "$" or "*" characters.');
      } else if (errorMessage.includes('User already registered')) {
        setError('This email is already in use. Please log in.');
      } else if (errorMessage.includes('Password should be at least 6 characters')) {
        setError('Password must be at least 6 characters long.');
      } else {
        setError('An unexpected error occurred. Please try again.');
        console.error("Supabase Signup Error:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [fullName, username, email, password, router]);

  const messageVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const formContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <>
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />

      <div className="moving-border w-full max-w-md mx-auto p-1 rounded-3xl">
        <div className="relative z-10 w-full p-8 space-y-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-[22px] shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="form"
                variants={formContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Create an Account</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Start your journey with us.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <motion.p
                      key="error"
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-300 p-3 rounded-lg text-center text-sm font-medium border border-red-200 dark:border-red-800"
                    >
                      {error}
                    </motion.p>
                  )}
                  
                  {/* Full Name Input */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="pl-10 block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="Full Name (e.g., Jane Doe)" />
                  </div>

                  {/* Nickname Input */}
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="pl-10 block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="Nickname (e.g., janedoe99)" />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10 block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="you@example.com" />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10 block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="Password (min. 6 characters)" />
                  </div>

                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </motion.button>
                </form>

                <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
                  Already have an account?{' '}
                  <Link href="/login" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                    Log In
                  </Link>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                variants={formContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center py-8"
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2, type: 'spring', stiffness: 200 } }}>
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-6">Signup Successful!</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{success}</p>
                <p className="text-sm text-gray-400 mt-4">Redirecting you to the dashboard...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

