import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { siteConfig } from '../config/siteConfig';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const currency = siteConfig.theme?.currency || '₹';
  const addToCartText = siteConfig.content?.common?.addToCart || 'Add to Cart';

  const price = Number(product.discount_price || product.price || 0);
  const originalPrice = product.discount_price ? Number(product.price || 0) : null;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1, product.sizes?.[0]);
  };

  const imageUrl = product.image_url || product.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80';

  return (
    <Link to={`/product/${product.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative h-full"
      >
        <div className="h-full flex flex-col bg-white border border-border/50 overflow-hidden hover:border-black transition-colors duration-500 rounded-xl">
          <div className="relative overflow-hidden bg-background-light aspect-[3/4] group">
            <motion.img
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80';
              }}
            />

            {discount && (
              <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                -{discount}%
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black border-2 border-black transition-all duration-300 shadow-xl"
              >
                {addToCartText}
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col p-6">
            {product.category && (
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.25em] mb-3 opacity-70">
                {product.category}
              </p>
            )}

            <h3 className="font-display text-sm font-bold text-secondary line-clamp-2 mb-4 uppercase tracking-tight leading-tight transition-colors group-hover:text-primary">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-3 mt-auto">
              <span className="text-lg font-black text-black tracking-tighter">{currency}{price.toLocaleString()}</span>
              {originalPrice && (
                <span className="text-xs text-text-light line-through tracking-tighter font-medium">{currency}{originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}