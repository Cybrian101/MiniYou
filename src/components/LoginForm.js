'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Lock } from 'lucide-react';
import { signInWithEmail, signInWithUsername } from '../lib/auth';
import './SignupForm.css';      // Moving border CSS (shared style)
import './StarsBackground.css'; // Star animation CSS (shared style)

export default function LoginForm() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginWithEmail, setLoginWithEmail] = useState(false); // State to toggle login method

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      if (loginWithEmail) {
        await signInWithEmail(identifier, password);
      } else {
        await signInWithUsername(identifier, password);
      }
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      console.error("Supabase Login Error:", err);
    } finally {
      setLoading(false);
    }
  }, [identifier, password, router, loginWithEmail]);

  const messageVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const toggleLoginMethod = () => {
    setLoginWithEmail(!loginWithEmail);
    setError('');
    setIdentifier('');
  };

  return (
    <>
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />

      <div className="moving-border w-full max-w-md mx-auto p-1 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 w-full p-8 space-y-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-[22px] shadow-2xl"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome Back</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {error && (
                <motion.p
                  key="error"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-300 p-3 rounded-lg text-center text-sm font-medium border border-red-200 dark:border-red-800"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="relative">
              {loginWithEmail ? (
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              ) : (
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              )}
              <motion.input
                whileFocus={{ scale: 1.02 }}
                id="identifier"
                type={loginWithEmail ? 'email' : 'text'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="pl-10 block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                placeholder={loginWithEmail ? 'you@example.com' : 'Your Nickname'}
                autoComplete={loginWithEmail ? 'email' : 'username'}
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={toggleLoginMethod}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none"
              >
                {loginWithEmail ? 'Use Nickname Instead' : 'Forgot Nickname? Use Email'}
              </button>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Log In'}
            </motion.button>
          </form>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Don’t have an account?{' '}
            <Link href="/signup" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}

