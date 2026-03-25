import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, X, Maximize2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const price = Number(product.price).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <>
      <motion.div
        layout
        whileHover={{ y: -8 }}
        className="bg-white rounded-[24px] overflow-hidden group border border-gray-100 shadow-sm relative"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 cursor-zoom-in">
          {/* Clicking the image opens the Modal */}
          <div onClick={() => setShowFullImage(true)}>
            <img
              src={product.image_url || product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover Icon to indicate Zoom */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="text-white" size={24} />
            </div>
          </div>

          <button 
            onClick={(e) => { e.preventDefault(); setIsFavorite(!isFavorite); }}
            className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full transition-all hover:scale-110"
          >
            <Heart size={18} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <Link to={`/product/${product.slug}`} className="block">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-1">{product.category}</p>
            <h3 className="text-xl font-bold mb-4 line-clamp-1 text-black">{product.name}</h3>
          </Link>
          
          <div className="flex items-center justify-between gap-4">
            <p className="text-2xl font-black text-black">{price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-black text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              Add <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* FULL IMAGE MODAL */}
      <AnimatePresence>
        {showFullImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullImage(false)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full">
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={product.image_url || product.image}
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
              alt={product.name}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}