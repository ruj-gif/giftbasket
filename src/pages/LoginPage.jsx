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
  const [mode, setMode] = useState('login'); // 'login' | 'register'
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light py-16 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md text-center">
          <div className="bg-white p-12 rounded-2xl shadow-elegant border border-border/40">
            <p className="text-secondary font-bold text-lg mb-8">You are already logged in.</p>
            <Link to="/account" className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black font-black uppercase tracking-[0.2em] py-5 transition-all duration-300 flex items-center justify-center gap-3 text-xs shadow-hover active:scale-[0.98]">
              Go to My Account
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light py-12 md:py-20 flex items-center">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white mb-8 border border-white/10 shadow-lg">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Access</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-secondary tracking-tight uppercase">
              {mode === 'login' ? authContent.loginTitle || 'Welcome Back' : authContent.registerTitle || 'Create Account'}
            </h1>
            <p className="text-text-light text-lg md:text-xl font-medium leading-relaxed opacity-80">
              {mode === 'login' 
                ? authContent.loginSubtitle || 'Login to your account to track orders' 
                : authContent.registerSubtitle || 'Create an account to track your orders'}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 sm:p-12 rounded-2xl shadow-elegant border border-border/40 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Lock className="w-48 h-48" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {mode === 'register' && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-text-light">{authContent.nameLabel || 'Full Name'} *</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={mode === 'register'}
                    placeholder="Full Name"
                    className="w-full pl-14 pr-5 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary bg-background-light/30"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-text-light">{authContent.emailLabel || 'Email Address'} *</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                  className="w-full pl-14 pr-5 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary bg-background-light/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-text-light">{authContent.passwordLabel || 'Password'} *</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  minLength={6}
                  className="w-full pl-14 pr-5 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary bg-background-light/30"
                />
              </div>
            </div>

            <AnimatePresence>
              {(error || success) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-5 rounded-xl border-2 flex items-center gap-3 text-xs font-black uppercase tracking-tight ${
                    error ? 'bg-error/10 border-error/20 text-error' : 'bg-success/10 border-success/20 text-success'
                  }`}
                >
                  {error ? <XCircle className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                  <span className="leading-relaxed">{error || success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black font-black uppercase tracking-[0.2em] py-5 transition-all duration-300 flex items-center justify-center gap-3 text-xs shadow-hover active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Please wait...' : mode === 'login' ? authContent.loginButton || 'Login' : authContent.registerButton || 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                className="text-text-light hover:text-black transition-colors text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
              >
                {mode === 'login' ? (
                  <>
                    {authContent.noAccount || "Don't have an account?"} 
                    <span className="text-primary">{authContent.registerLink || 'Register'}</span>
                  </>
                ) : (
                  <>
                    {authContent.hasAccount || 'Already have an account?'} 
                    <span className="text-primary">{authContent.loginLink || 'Login'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/track-order" className="inline-flex items-center gap-3 text-text-light hover:text-black transition-colors font-black uppercase tracking-widest text-[10px] group">
            {authContent.trackGuest || 'Track order without login'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
