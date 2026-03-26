import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, X, Maximize2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const price = Number(product.price).toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });

  return (
    <>
      <motion.div layout whileHover={{ y: -8 }} className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm relative group">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 cursor-zoom-in" onClick={() => setShowFullImage(true)}>
          <img src={product.image || product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><Maximize2 className="text-white" size={24} /></div>
          
          <button onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }} className="absolute bottom-3 left-3 bg-white/90 p-2 rounded-full shadow-sm z-10">
            <Heart size={18} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
          </button>

          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 px-3 py-1.5 rounded-full shadow-sm">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-black">4.8</span>
          </div>
        </div>

        <div className="p-6">
          <Link to={`/product/${product.slug}`}>
            <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{product.category}</p>
            <h3 className="text-xl font-bold mb-4 line-clamp-1">{product.name}</h3>
          </Link>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-black">{price}</span>
            <button onClick={() => addToCart(product)} className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold uppercase flex items-center gap-2">
              Add <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showFullImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFullImage(false)} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            <button className="absolute top-6 right-6 text-white"><X size={32} /></button>
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} src={product.image || product.image_url} className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}