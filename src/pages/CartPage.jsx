import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const subtotal = getCartTotal();

  const cartContent = siteConfig.content?.cart || {};
  const theme = siteConfig.theme || {};
  const currency = theme.currency || '₹';

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background-light py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 60 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6"
          >
            <ShoppingBag className="w-12 h-12 text-primary" />
          </motion.div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-secondary">
            {cartContent.emptyTitle || 'Your Cart is Empty'}
          </h1>
          <p className="text-text-light text-lg mb-8">
            {cartContent.emptySubtitle || 'Explore our collection and find something special'}
          </p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            {cartContent.continueShopping || 'Continue Shopping'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-secondary tracking-tight uppercase">{cartContent.title || 'Shopping Cart'}</h1>
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <motion.div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item, index) => {
                const price = Number(item.discount_price || item.price || 0);
                return (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="bg-white p-4 sm:p-6 rounded-xl shadow-elegant border border-border/40 group overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      <div className="flex gap-4 sm:flex-1">
                        <div className="relative overflow-hidden rounded-lg shrink-0">
                          <img
                            src={item.image_url || item.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80'}
                            alt={item.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover group-hover:scale-110 transition-transform duration-500 bg-gray-100"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold text-base sm:text-lg text-secondary mb-1 sm:mb-2 line-clamp-2 uppercase tracking-tight leading-tight">{item.name}</h3>
                          {item.selectedSize && <p className="text-[10px] font-black uppercase tracking-widest text-text-light mb-1">Size: {item.selectedSize}</p>}
                          <p className="text-primary font-black text-base sm:text-lg tracking-tighter">{currency}{price.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6">
                        <div className="flex items-center gap-2 bg-background-light rounded-lg p-1.5 border border-border/30">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-black hover:text-white flex items-center justify-center shadow-sm transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </motion.button>
                          <span className="font-black min-w-[2rem] text-center tracking-tighter">{item.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-black hover:text-white flex items-center justify-center shadow-sm transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </motion.button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="text-text-light hover:text-error transition-colors p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-elegant lg:sticky lg:top-24 border border-border/40">
              <h2 className="font-display text-2xl font-black mb-6 text-secondary tracking-tight uppercase">{cartContent.summaryTitle || 'Order Summary'}</h2>

              <div className="space-y-4 mb-8 pb-6 border-b border-border">
                <div className="flex justify-between text-text-light font-medium">
                  <span>{cartContent.itemsLabel || 'Items'} ({cart.length})</span>
                  <span>{currency}{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-text-light font-medium">
                  <span>{cartContent.shippingLabel || 'Shipping'}</span>
                  <span className="text-success font-black uppercase text-xs tracking-widest">Free</span>
                </div>

                <div className="flex justify-between text-xl font-black bg-background-light p-5 rounded-xl border border-border/30">
                  <span>{cartContent.totalLabel || 'Total'}:</span>
                  <span className="text-primary tracking-tighter">{currency}{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary flex items-center justify-center gap-2 py-5 uppercase tracking-widest text-xs font-black shadow-hover active:scale-[0.98] transition-all"
              >
                {cartContent.checkoutButton || 'Proceed to Checkout'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link to="/shop" className="block text-center mt-6 text-text-light hover:text-black font-black text-[10px] uppercase tracking-[0.2em] transition-colors">
                {cartContent.continueShopping || 'Continue Shopping'}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}