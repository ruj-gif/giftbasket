import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Truck, LogOut } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export default function AccountPage() {
  const { user, logout, isLoggedIn } = useUser();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light py-16 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md text-center">
          <h1 className="font-display text-2xl font-bold mb-6 text-secondary">My Account</h1>
          <p className="text-text-light mb-8">Please login to view your account.</p>
          <Link to="/login" className="btn-primary inline-flex items-center justify-center gap-2">
            Login / Register
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-8 text-secondary">My Account</h1>

        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-elegant mb-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-secondary">{user?.name || 'User'}</h2>
              <p className="text-text-light text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              to="/my-orders"
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Package className="w-6 h-6 text-primary" />
              <div className="flex-1">
                <p className="font-semibold text-secondary">My Orders</p>
                <p className="text-sm text-text-light">View and track all your orders</p>
              </div>
              <span className="text-primary font-medium">→</span>
            </Link>

            <Link
              to="/track-order"
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Truck className="w-6 h-6 text-primary" />
              <div className="flex-1">
                <p className="font-semibold text-secondary">Track Order</p>
                <p className="text-sm text-text-light">Track by Order ID and email (for guests)</p>
              </div>
              <span className="text-primary font-medium">→</span>
            </Link>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  logout();
                  navigate('/');
                }
              }}
              className="w-full flex items-center gap-3 p-4 rounded-lg border-2 border-red-200 bg-red-50/50 hover:bg-red-50 text-red-600 transition-colors"
            >
              <LogOut className="w-6 h-6" />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
