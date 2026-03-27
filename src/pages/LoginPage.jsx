import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ShieldCheck, Sparkles, XCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { api } from '../lib/api';
import { siteConfig } from '../config/siteConfig';

export default function LoginPage() {
  const { setUserFromApi, isLoggedIn } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const authContent = siteConfig.content?.auth || {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!formData.email?.trim() || !formData.password?.trim()) {
      setError('Email and password are required');
      return;
    }
    if (mode === 'register' && !formData.name?.trim()) {
      setError('Name is required for registration');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'register') {
        const response = await api.auth.register({
          email: formData.email.trim().toLowerCase(),
          name: formData.name?.trim() || formData.email.split('@')[0],
          password: formData.password,
          phone: formData.phone || null,
        });
        if (response.success && response.data) {
          setUserFromApi(response.data);
          setSuccess('Account created! Redirecting...');
          setTimeout(() => navigate('/account'), 500);
        } else {
          setError(response.error?.message || 'Registration failed');
        }
      } else {
        const response = await api.auth.login({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });
        if (response.success && response.data) {
          setUserFromApi(response.data);
          setSuccess('Logged in! Redirecting...');
          setTimeout(() => navigate('/account'), 500);
        } else {
          setError(response.error?.message || 'Invalid email or password');
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-br from-[#f8f5f2] to-white flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md text-center">
          <div className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-white/30">
            <p className="text-gray-700 text-lg mb-6">You are already logged in.</p>
            <Link to="/account" className="bg-black text-white px-6 py-3 rounded-full hover:scale-105 transition-all">
              Go to My Account →
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#f8f5f2] to-white py-12 md:py-20 flex items-center"
    >
      <div className="container mx-auto px-4 max-w-xl">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Secure Access</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>

          <p className="text-gray-500 text-sm">
            {mode === 'login'
              ? 'Login to manage your orders'
              : 'Create an account to track your orders'}
          </p>
        </div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-xl border border-white/30"
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            {mode === 'register' && (
              <div>
                <label className="text-xs text-gray-400">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/20 outline-none"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-gray-400">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/20 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/20 outline-none"
              />
            </div>

            <AnimatePresence>
              {(error || success) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`p-3 rounded-lg text-sm ${
                    error ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}
                >
                  {error || success}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full hover:scale-[1.02] transition-all"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Login →' : 'Create Account →'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setError('');
                }}
                className="text-gray-500 text-sm hover:text-black"
              >
                {mode === 'login'
                  ? "Don't have an account? Register"
                  : 'Already have an account? Login'}
              </button>
            </div>

          </form>
        </motion.div>

        {/* TRACK */}
        <div className="text-center mt-8">
          <Link to="/track-order" className="text-gray-500 text-sm hover:text-black">
            Track order without login →
          </Link>
        </div>

      </div>
    </motion.div>
  );
}