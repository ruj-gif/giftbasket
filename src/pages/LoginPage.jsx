import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { api } from '../lib/api';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Email and password are required');
      return;
    }

    if (mode === 'register' && !formData.name.trim()) {
      setError('Name is required');
      return;
    }

    setLoading(true);

    try {
      let response;

      if (mode === 'register') {
        response = await api.auth.register({
          email: formData.email.trim().toLowerCase(),
          name: formData.name.trim(),
          password: formData.password,
        });
      } else {
        response = await api.auth.login({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });
      }

      if (response && response.success) {
        setUserFromApi(response.data); // 🔥 instant update
        setSuccess(mode === 'login' ? 'Logged in!' : 'Account created!');
        
        navigate('/account'); // ✅ NO setTimeout
      } else {
        setError(response?.error || 'Something went wrong');
      }

    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // ✅ already logged in
  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>You are already logged in</p>
          <Link to="/account">Go to Account →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="max-w-md w-full p-6 bg-white border">

        <div className="text-center mb-6">
          <ShieldCheck className="mx-auto mb-2" />
          <h1 className="text-2xl font-semibold">
            {mode === 'login' ? 'Login' : 'Register'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {mode === 'register' && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <AnimatePresence>
            {(error || success) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`p-2 text-sm ${
                  error
                    ? 'bg-red-100 text-red-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {error || success}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-2"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
            }}
            className="text-sm text-gray-500"
          >
            {mode === 'login'
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/track-order" className="text-sm text-gray-500">
            Track order →
          </Link>
        </div>
      </div>
    </div>
  );
}