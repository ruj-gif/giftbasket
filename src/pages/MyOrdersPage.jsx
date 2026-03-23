import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ChevronRight } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { api } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';

const STATUS_LABELS = {
  pending: 'Order Placed',
  processing: 'Processing',
  completed: 'Delivered',
  cancelled: 'Cancelled',
};

export default function MyOrdersPage() {
  const { user, isLoggedIn } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) return;
    loadOrders();
  }, [isLoggedIn, user?.email]);

  const loadOrders = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await api.orders.getAll({
        customer_email: user.email,
        limit: 50,
        sort: 'created_at',
        order: 'DESC',
      });
      const list = Array.isArray(response?.data) ? response.data : [];
      setOrders(list);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light py-16 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md text-center">
          <h1 className="font-display text-2xl font-bold mb-6 text-secondary">My Orders</h1>
          <p className="text-text-light mb-8">Please login to view your orders.</p>
          <Link to="/login" className="btn-primary inline-flex items-center justify-center gap-2">
            Login / Register
          </Link>
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2 text-secondary">My Orders</h1>
          <p className="text-text-light">Orders placed with {user?.email}</p>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-error/10 border border-error/20 text-error text-sm font-medium mb-6">
            {error}
          </div>
        )}

        {orders.length === 0 && !error && (
          <div className="bg-white p-8 sm:p-12 rounded-lg shadow-elegant text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-xl font-bold text-secondary mb-3">No orders yet</h2>
            <p className="text-text-light mb-6">You haven&apos;t placed any orders with this account.</p>
            <Link to="/shop" className="btn-primary inline-flex items-center justify-center gap-2">
              Start Shopping
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => {
            const items = order.order_items
              ? typeof order.order_items === 'string'
                ? JSON.parse(order.order_items)
                : order.order_items
              : [];
            const itemCount = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
            const statusLabel = STATUS_LABELS[order.status] || order.status;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-elegant overflow-hidden"
              >
                <Link
                  to="/track-order"
                  state={{ prefillOrderId: order.id, prefillEmail: user?.email }}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-6 hover:bg-primary/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-semibold text-secondary truncate">
                        {order.order_number || order.id}
                      </span>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${
                          order.status === 'cancelled'
                            ? 'bg-error/10 text-error'
                            : order.status === 'completed'
                            ? 'bg-success/10 text-success'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {statusLabel}
                      </span>
                    </div>
                    <p className="text-sm text-text-light">
                      {new Date(order.created_at).toLocaleDateString(undefined, {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                      {' · '}
                      {itemCount} item{itemCount !== 1 ? 's' : ''}
                    </p>
                    <p className="font-bold text-primary mt-1">₹{Number(order.total_amount || 0).toFixed(0)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-semibold text-primary">View details</span>
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8">
          <Link
            to="/account"
            className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
          >
            ← Back to Account
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
