import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, CheckCircle, XCircle, Search, ArrowRight, MapPin, Sparkles, Phone } from 'lucide-react';
import { api } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { siteConfig } from '../config/siteConfig';

const STATUS_STEPS = [
  { key: 'pending', label: 'Order Placed', icon: Package },
  { key: 'processing', label: 'Processing', icon: Truck },
  { key: 'completed', label: 'Delivered', icon: CheckCircle },
];

export default function TrackOrderPage() {
  const location = useLocation();
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const trackContent = siteConfig.content?.trackOrder || {};
  const theme = siteConfig.theme || {};
  const currency = theme.currency || '₹';

  const prefillOrderId = location.state?.prefillOrderId || new URLSearchParams(location.search).get('orderId');
  const prefillEmail = location.state?.prefillEmail;

  useEffect(() => {
    if (prefillOrderId || prefillEmail) {
      if (prefillOrderId) setOrderId(prefillOrderId);
      if (prefillEmail) setEmail(prefillEmail);
      if (prefillOrderId && prefillEmail) {
        setOrder(null);
        setError(null);
      }
    }
  }, [prefillOrderId, prefillEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = orderId?.trim();
    const em = email?.trim().toLowerCase();

    if (!id || !em) {
      setError('Please enter both Order ID and Email');
      return;
    }

    setLoading(true);
    setSearched(true);
    setError(null);
    setOrder(null);

    try {
      const response = await api.orders.getById(id);
      if (response.success && response.data) {
        const fetchedOrder = response.data;
        const orderEmail = (fetchedOrder.customer_email || '').toLowerCase();
        if (orderEmail === em) {
          setOrder(fetchedOrder);
        } else {
          setError('Order not found. Please check your Order ID and Email.');
          setOrder(null);
        }
      } else {
        setError('Order not found. Please check your Order ID and Email.');
      }
    } catch (err) {
      setError('Order not found. Please check your Order ID and Email.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setOrderId('');
    setEmail('');
    setOrder(null);
    setSearched(false);
    setError(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const orderItems = order?.order_items
    ? (typeof order.order_items === 'string' ? JSON.parse(order.order_items) : order.order_items)
    : [];

  const statusOrder = { pending: 0, processing: 1, completed: 2, cancelled: -1 };
  const currentStatusIndex = order ? statusOrder[order.status] ?? 0 : 0;
  const isCancelled = order?.status === 'cancelled';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white mb-8 border border-white/10 shadow-lg">
              <Search className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Order Tracking</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-secondary tracking-tight uppercase">
              {trackContent.title || 'Track Your Order'}
            </h1>
            <p className="text-text-light text-lg md:text-xl font-medium leading-relaxed opacity-80">
              {trackContent.subtitle || 'Enter your Order ID and Email to see your order status'}
            </p>
          </motion.div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-elegant mb-12 border border-border/40"
        >
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-text-light">{trackContent.orderIdLabel || 'Order ID'} *</label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Order ID"
                  className="w-full px-5 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent font-bold text-secondary bg-background-light/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-text-light">{trackContent.emailLabel || 'Email'} *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-5 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent font-bold text-secondary bg-background-light/30 transition-all"
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-5 rounded-xl bg-error/10 border-2 border-error/20 text-error text-xs font-black uppercase tracking-tight flex items-center gap-3"
                >
                  <XCircle className="w-5 h-5 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="submit" 
                className="flex-1 bg-black text-white hover:bg-white hover:text-black border-2 border-black font-black uppercase tracking-[0.2em] py-5 transition-all duration-300 flex items-center justify-center gap-3 text-xs shadow-hover active:scale-[0.98]"
              >
                <Search className="w-4 h-4" />
                {trackContent.buttonText || 'Track Order'}
              </button>
              {searched && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-10 py-5 border-2 border-border/60 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] text-secondary hover:border-black transition-all active:scale-[0.98]"
                >
                  {trackContent.searchAgain || 'Search Again'}
                </button>
              )}
            </div>
          </div>
        </motion.form>

        <AnimatePresence>
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white p-8 md:p-12 rounded-2xl shadow-elegant border border-border/40 space-y-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Truck className="w-64 h-64" />
              </div>

              {/* Status Banner */}
              <div className={`p-6 rounded-xl border-2 ${isCancelled ? 'bg-error/10 border-error/20' : 'bg-black border-black text-white shadow-xl'} relative z-10`}>
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isCancelled ? 'bg-error/20 text-error' : 'bg-white text-black'}`}>
                    {isCancelled ? <XCircle className="w-8 h-8" /> : <Package className="w-8 h-8" />}
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${isCancelled ? 'text-error' : 'text-primary'}`}>Current Status</p>
                    <p className="text-2xl font-black uppercase tracking-tighter mt-1">{order.status}</p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              {!isCancelled && (
                <div className="relative z-10">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-light mb-10">{trackContent.progressTitle || 'Order Progress'}</h3>
                  <div className="flex items-center justify-between relative px-2">
                    <div className="absolute top-6 left-0 right-0 h-1 bg-gray-100 -z-10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStatusIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
                        className="h-full bg-black"
                      />
                    </div>
                    {STATUS_STEPS.map((step, idx) => {
                      const Icon = step.icon;
                      const isActive = idx <= currentStatusIndex;
                      const isPast = idx < currentStatusIndex;
                      return (
                        <div key={step.key} className="flex flex-col items-center">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 + (idx * 0.1) }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 shadow-sm ${
                              isActive ? 'bg-black border-black text-white' : 'bg-white border-gray-100 text-gray-300'
                            }`}
                          >
                            {isPast ? <CheckCircle className="w-5 h-5 text-primary" /> : <Icon className="w-5 h-5" />}
                          </motion.div>
                          <span className={`text-[10px] font-black uppercase tracking-widest mt-4 ${isActive ? 'text-secondary' : 'text-gray-300'}`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="relative z-10">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-light mb-6">{trackContent.itemsTitle || 'Order Items'}</h3>
                <div className="space-y-4">
                  {orderItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-4 border-b border-border/40 last:border-0">
                      <div>
                        <p className="font-bold text-secondary text-base uppercase tracking-tight">{item.product_name}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-light mt-1">Qty: {item.quantity} {item.size && `• Size: ${item.size}`}</p>
                      </div>
                      <p className="font-black text-secondary tracking-tighter text-lg">{currency}{(Number(item.price) * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid md:grid-cols-2 gap-10 pt-8 border-t border-border/40 relative z-10">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light mb-4 flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {trackContent.addressTitle || 'Delivery Address'}
                  </h4>
                  <div className="space-y-1">
                    <p className="font-bold text-secondary uppercase text-sm tracking-tight">{order.customer_name}</p>
                    <p className="text-text-light text-sm font-medium">{order.shipping_address}</p>
                    <p className="text-text-light text-sm font-medium">{order.city}, {order.zipcode}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex justify-between text-2xl font-black bg-background-light p-6 rounded-xl border border-border/30">
                    <span className="uppercase tracking-tighter text-secondary">Total:</span>
                    <span className="text-primary tracking-tighter">{currency}{Number(order.total_amount || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link to="/shop" className="inline-flex items-center gap-3 text-secondary hover:text-primary transition-colors font-black uppercase tracking-widest text-[10px] group">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
