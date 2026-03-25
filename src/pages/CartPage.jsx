import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext'; // Verify this path!
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-black/5 mb-6">
            <ShoppingBag className="w-12 h-12 text-black" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-4">{cartContent.emptyTitle || 'Your Cart is Empty'}</h1>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full uppercase text-xs font-bold tracking-widest">
            {cartContent.continueShopping || 'Continue Shopping'} <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-4xl font-bold mb-12 uppercase tracking-tight">{cartContent.title || 'Shopping Cart'}</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6"
                >
                  <img 
                    src={item.image_url || item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-lg bg-gray-50"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Mug'; }} 
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-lg uppercase tracking-tight">{item.name}</h3>
                    <p className="text-gray-500 font-bold">{currency}{Number(item.price).toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white rounded-md transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white rounded-md transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 uppercase">{cartContent.summaryTitle || 'Order Summary'}</h2>
              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>{currency}{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
              </div>
              <div className="flex justify-between text-2xl font-bold mb-8">
                <span>Total</span>
                <span>{currency}{subtotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all"
              >
                {cartContent.checkoutButton || 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}