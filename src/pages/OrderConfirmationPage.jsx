import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Package, Truck, Sparkles, MapPin, Phone } from 'lucide-react';
import { api } from '../lib/api';
import { useCart } from '../contexts/CartContext';
import PaymentQRCode from '../components/PaymentQRCode';
import LoadingSpinner from '../components/LoadingSpinner';
import { siteConfig } from '../config/siteConfig';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const confirmationContent = siteConfig.content?.orderConfirmation || {};
  const theme = siteConfig.theme || {};
  const currency = theme.currency || '₹';

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const response = await api.orders.getById(orderId);
      if (response.success && response.data) {
        setOrder(response.data);
        clearCart();
      }
    } catch (error) {
      console.error('Failed to load order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-light text-lg">Order not found</p>
      </div>
    );
  }

  const orderItems = order.order_items ? (typeof order.order_items === 'string' ? JSON.parse(order.order_items) : order.order_items) : [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-success/10 mb-8 border-4 border-success/20 shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-success" />
          </motion.div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-secondary tracking-tight uppercase">
            {confirmationContent.title || 'Order Confirmed!'}
          </h1>
          <p className="text-text-light text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
            {confirmationContent.subtitle || "Thank you for your order. We'll send you a confirmation email shortly."}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-elegant mb-10 border border-border/40 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Package className="w-64 h-64" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 pb-10 border-b border-border/60">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light mb-2">{confirmationContent.orderNumberLabel || 'Order Number'}</p>
              <p className="font-mono text-2xl font-black text-secondary tracking-tighter">#{order.id}</p>
            </div>
            <div className="md:text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light mb-2">{confirmationContent.statusLabel || 'Status'}</p>
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-black text-white font-black text-[10px] uppercase tracking-widest shadow-lg">
                <Sparkles className="w-3 h-3 text-primary" />
                {order.status}
              </span>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-light">{confirmationContent.itemsTitle || 'Order Items'}</h3>
            <div className="space-y-4">
              {orderItems.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  className="flex justify-between items-center py-4 border-b border-border/40 last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-bold text-secondary text-base uppercase tracking-tight leading-tight">{item.product_name}</p>
                    <div className="flex gap-3 mt-1.5">
                      {item.size && <span className="text-[10px] font-black uppercase tracking-widest text-text-light">Size: {item.size}</span>}
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-light">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <p className="font-black text-secondary tracking-tighter text-lg">{currency}{(Number(item.price) * item.quantity).toLocaleString()}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4 mb-10 pb-10 border-b border-border/60">
            <div className="flex justify-between text-sm font-bold text-text-light">
              <span className="uppercase tracking-[0.1em]">Subtotal:</span>
              <span className="tracking-tighter">{currency}{Number(order.subtotal || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-text-light">
              <span className="uppercase tracking-[0.1em]">Shipping:</span>
              <span className="tracking-tighter">{currency}{Number(order.shipping_charge || 0).toLocaleString()}</span>
            </div>
            {Number(order.tax_amount || 0) > 0 && (
              <div className="flex justify-between text-sm font-bold text-text-light">
                <span className="uppercase tracking-[0.1em]">Tax:</span>
                <span className="tracking-tighter">{currency}{Number(order.tax_amount || 0).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-2xl font-black bg-background-light p-6 rounded-xl border border-border/30 mt-4">
              <span className="uppercase tracking-tighter">Total:</span>
              <span className="text-primary tracking-tighter">{currency}{Number(order.total_amount || 0).toLocaleString()}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light mb-4 flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {confirmationContent.addressTitle || 'Delivery Address'}
              </h4>
              <div className="space-y-1">
                <p className="font-bold text-secondary uppercase text-sm tracking-tight">{order.customer_name}</p>
                <p className="text-text-light text-sm font-medium">{order.shipping_address}</p>
                <p className="text-text-light text-sm font-medium">{order.city}, {order.zipcode}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light mb-4 flex items-center gap-2">
                <Phone className="w-3 h-3" />
                {confirmationContent.contactTitle || 'Contact Info'}
              </h4>
              <div className="space-y-1">
                <p className="text-text-light text-sm font-medium">{order.customer_email}</p>
                <p className="text-text-light text-sm font-medium">{order.customer_phone}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {order.payment_method === 'upi' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <PaymentQRCode />
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Link to="/shop" className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-black uppercase tracking-[0.2em] px-10 py-5 transition-all duration-300 flex items-center justify-center gap-3 text-xs shadow-hover active:scale-[0.98]">
            {confirmationContent.continueButton || 'Continue Shopping'}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/track-order" className="bg-white text-black hover:bg-black hover:text-white border-2 border-black font-black uppercase tracking-[0.2em] px-10 py-5 transition-all duration-300 flex items-center justify-center gap-3 text-xs active:scale-[0.98]">
            <Truck className="w-4 h-4" />
            {confirmationContent.trackButton || 'Track Order'}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
